import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchSlokas } from "@/hooks/useGita";
import { type Sloka, getTextForLanguage } from "@/types/gita";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Mic, MicOff, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Web Speech API types ──────────────────────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

const LANG_CODE: Record<string, string> = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
  sa: "sa-IN",
};

function parseSlokaQuery(
  query: string,
): { chapter: number; number: number } | null {
  const patterns = [
    /chapter\s*(\d+)\s*(?:sloka|shloka|verse|shlok)\s*(\d+)/i,
    /adhyaya\s*(\d+)\s*(?:sloka|shloka|verse|shlok)\s*(\d+)/i,
    /ch\s*\.?\s*(\d+)\s*[,\s]+(?:v|s)\.?\s*(\d+)/i,
    /(\d+)\.(\d+)/,
  ];
  for (const pat of patterns) {
    const m = query.match(pat);
    if (m) return { chapter: Number(m[1]), number: Number(m[2]) };
  }
  return null;
}

// ── Waveform animation ────────────────────────────────────────────────────────
function VoiceWaveform() {
  return (
    <div className="flex items-end gap-[3px] h-6" aria-hidden="true">
      {([0.6, 1, 0.75, 1, 0.5, 0.85, 0.65] as const).map((h, i) => (
        <motion.div
          // biome-ignore lint/suspicious/noArrayIndexKey: static fixed-length decorative bars
          key={`bar-${i}`}
          className="w-[3px] rounded-full bg-primary"
          animate={{ scaleY: [h, 1, h * 0.6, 1, h] }}
          transition={{
            duration: 0.8 + i * 0.08,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ height: "100%", originY: 1 }}
        />
      ))}
    </div>
  );
}

// ── Sloka result card ─────────────────────────────────────────────────────────
function SlokaCard({
  sloka,
  index,
  language,
}: { sloka: Sloka; index: number; language: string }) {
  const navigate = useNavigate();
  const ch = Number(sloka.chapterNumber);
  const num = Number(sloka.slokaNumber);
  const meaning = getTextForLanguage(
    sloka.meanings,
    language as "en" | "hi" | "te" | "sa",
  );

  const handleCardNav = () =>
    navigate({
      to: "/sloka/$chapter/$number",
      params: { chapter: String(ch), number: String(num) },
    });

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardNav();
    }
  };

  return (
    <motion.button
      type="button"
      data-ocid={`search.result.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="cosmic-card-golden rounded-xl p-5 flex flex-col gap-3 hover:border-primary/50 transition-smooth cursor-pointer group text-left w-full"
      onClick={handleCardNav}
      onKeyDown={handleCardKeyDown}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-display">
          Ch. {ch}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          Śloka {num}
        </Badge>
      </div>
      <p className="sanskrit-text text-primary glow-golden text-base leading-relaxed line-clamp-2">
        {sloka.sanskritText}
      </p>
      <p className="text-muted-foreground text-sm italic line-clamp-1">
        {sloka.transliteration}
      </p>
      <p className="text-foreground/80 text-sm line-clamp-2">{meaning}</p>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          data-ocid={`search.view_sloka_button.${index + 1}`}
          className="text-primary hover:text-primary hover:bg-primary/10 gap-1.5 transition-smooth group-hover:translate-x-1 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            navigate({
              to: "/sloka/$chapter/$number",
              params: { chapter: String(ch), number: String(num) },
            });
          }}
        >
          <BookOpen className="w-3.5 h-3.5" />
          View Sloka
        </Button>
      </div>
    </motion.button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SearchPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const { data, isLoading } = useSearchSlokas(searchTerm);
  const results = data?.items ?? [];

  useEffect(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) setSpeechSupported(false);
  }, []);

  const handleSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const direct = parseSlokaQuery(trimmed);
    if (direct) {
      navigate({
        to: "/sloka/$chapter/$number",
        params: {
          chapter: String(direct.chapter),
          number: String(direct.number),
        },
      });
      return;
    }
    setSearchTerm(trimmed);
  }, [query, navigate]);

  const toggleVoice = useCallback(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const rec = new SR();
    rec.lang = LANG_CODE[language] ?? "en-IN";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript ?? "";
      setQuery(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);

    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, [listening, language]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const suggestions = [
    "Chapter 2 Sloka 47",
    "Karma Yoga",
    "Adhyaya 3 Verse 16",
    "Nishkama Karma",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="search.page">
        {/* Hero header */}
        <div className="relative bg-card border-b border-border/40 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[120px]" />
          </div>
          <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center text-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-primary animate-glow-pulse mx-auto mb-3" />
              <h1 className="font-display text-4xl md:text-5xl divine-gradient-text mb-1">
                Seek Divine Wisdom
              </h1>
              <p className="text-muted-foreground text-base max-w-md mx-auto">
                Search by chapter & sloka number, topic, or ask in your language
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full max-w-2xl mt-2"
            >
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    data-ocid="search.search_input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("search.placeholder")}
                    className="pl-10 pr-4 py-6 text-base bg-secondary/60 border-primary/20 focus:border-primary/50 rounded-xl"
                    aria-label="Search slokas"
                  />
                </div>

                {/* Voice button */}
                <Button
                  type="button"
                  data-ocid="search.voice_button"
                  onClick={toggleVoice}
                  disabled={!speechSupported}
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 rounded-xl border-primary/30 flex-shrink-0 transition-smooth ${listening ? "bg-primary/20 border-primary animate-glow-pulse" : "hover:bg-primary/10"}`}
                  aria-label={
                    listening ? "Stop listening" : "Start voice input"
                  }
                  title={
                    !speechSupported
                      ? "Voice not supported in this browser"
                      : ""
                  }
                >
                  {listening ? (
                    <VoiceWaveform />
                  ) : speechSupported ? (
                    <Mic className="w-5 h-5 text-primary" />
                  ) : (
                    <MicOff className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>

                {/* Search submit */}
                <Button
                  type="button"
                  data-ocid="search.submit_button"
                  onClick={handleSearch}
                  className="h-12 px-6 rounded-xl divine-gradient text-primary-foreground font-display flex-shrink-0 hover:opacity-90 transition-smooth"
                >
                  Search
                </Button>
              </div>

              {/* Voice status */}
              <AnimatePresence>
                {listening && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-primary text-sm mt-2 flex items-center gap-2"
                  >
                    <Mic className="w-3.5 h-3.5 animate-glow-pulse" />
                    Listening… speak your query
                  </motion.p>
                )}
                {!speechSupported && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground text-xs mt-2"
                  >
                    Voice input is not supported in this browser. Please type
                    your query.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-ocid={`search.suggestion.${s.toLowerCase().replace(/\s+/g, "_")}`}
                    onClick={() => {
                      setQuery(s);
                      setSearchTerm(s);
                    }}
                    className="px-3 py-1 rounded-full text-xs border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-smooth"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Results area */}
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          {/* Loading */}
          {isLoading && (
            <div
              data-ocid="search.loading_state"
              className="flex flex-col items-center gap-6 py-16"
            >
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <p className="text-muted-foreground text-sm animate-glow-pulse">
                Searching the sacred texts…
              </p>
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-sm mb-6"
              >
                Found{" "}
                <span className="text-primary font-display">
                  {Number(data?.totalCount ?? 0)}
                </span>{" "}
                sacred verses for{" "}
                <span className="text-foreground italic">"{searchTerm}"</span>
              </motion.p>
              <div
                className="flex flex-col gap-4"
                data-ocid="search.results.list"
              >
                {results.map((sloka, i) => (
                  <SlokaCard
                    key={`${sloka.chapterNumber}-${sloka.slokaNumber}`}
                    sloka={sloka}
                    index={i}
                    language={language}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state after search */}
          {!isLoading && searchTerm && results.length === 0 && (
            <motion.div
              data-ocid="search.empty_state"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center gap-5 py-20"
            >
              <div className="text-5xl animate-float" aria-hidden="true">
                🪷
              </div>
              <h2 className="font-display text-xl text-foreground">
                No verses found for this query
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs">
                The Gita holds 700 verses — try searching by chapter number,
                topic like "karma" or "dharma", or ask directly: "Chapter 2
                Sloka 47"
              </p>
              <Button
                type="button"
                variant="outline"
                data-ocid="search.browse_chapters_button"
                className="border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => navigate({ to: "/chapters" })}
              >
                Browse All Chapters
              </Button>
            </motion.div>
          )}

          {/* Initial state (no search yet) */}
          {!isLoading && !searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center gap-6 py-20"
            >
              <div className="w-20 h-20 rounded-full border border-primary/20 glow-border-golden flex items-center justify-center animate-glow-pulse">
                <span className="text-3xl font-display text-primary">ॐ</span>
              </div>
              <div>
                <h2 className="font-display text-lg text-foreground/80 mb-1">
                  Begin your search for divine wisdom
                </h2>
                <p className="text-muted-foreground text-sm">
                  Type a topic, chapter reference, or use your voice to seek
                  guidance
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-2 text-left">
                {[
                  { label: "By reference", eg: "Chapter 2 Sloka 47" },
                  { label: "By topic", eg: "Karma Yoga" },
                  { label: "By keyword", eg: "Nishkama" },
                  { label: "By concept", eg: "Self-realization" },
                ].map((item) => (
                  <div key={item.label} className="cosmic-card rounded-lg p-3">
                    <p className="text-muted-foreground text-xs">
                      {item.label}
                    </p>
                    <p className="text-foreground/70 text-xs italic mt-0.5">
                      "{item.eg}"
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

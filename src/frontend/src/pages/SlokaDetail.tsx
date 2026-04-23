import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChapterSlokas, useSloka } from "@/hooks/useGita";
import { getTextForLanguage } from "@/types/gita";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Home,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Audio playback via SpeechSynthesis ───────────────────────────────────────
function useSpeechSynth() {
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, lang = "sa-IN") => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.75;
    u.pitch = 0.9;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
    },
    [],
  );

  return { speaking, speak, stop };
}

// ── Glowing ring animation while speaking ────────────────────────────────────
function AudioPulseRing({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <AnimatePresence>
      <motion.span
        key="pulse"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{
          duration: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        }}
        className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
      />
    </AnimatePresence>
  );
}

// ── Golden divider ───────────────────────────────────────────────────────────
function GoldenDivider() {
  return (
    <div className="flex items-center gap-3 my-6" aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <span className="text-primary/60 text-xs font-display">✦</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}

// ── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ chapter, number }: { chapter: number; number: number }) {
  const navigate = useNavigate();
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap"
    >
      <button
        type="button"
        data-ocid="sloka-detail.breadcrumb.home"
        onClick={() => navigate({ to: "/" })}
        className="hover:text-primary transition-smooth flex items-center gap-1"
      >
        <Home className="w-3 h-3" /> Home
      </button>
      <ChevronRight className="w-3 h-3 opacity-50" />
      <button
        type="button"
        data-ocid="sloka-detail.breadcrumb.chapters"
        onClick={() => navigate({ to: "/chapters" })}
        className="hover:text-primary transition-smooth"
      >
        Chapters
      </button>
      <ChevronRight className="w-3 h-3 opacity-50" />
      <button
        type="button"
        data-ocid="sloka-detail.breadcrumb.chapter"
        onClick={() =>
          navigate({ to: "/chapter/$id", params: { id: String(chapter) } })
        }
        className="hover:text-primary transition-smooth"
      >
        Chapter {chapter}
      </button>
      <ChevronRight className="w-3 h-3 opacity-50" />
      <span className="text-primary">Śloka {number}</span>
    </nav>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SlokaDetail() {
  const { chapter: chapterParam, number: numberParam } = useParams({
    from: "/sloka/$chapter/$number",
  });
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { speaking, speak, stop } = useSpeechSynth();

  const chapter = Number(chapterParam);
  const number = Number(numberParam);

  const { data: sloka, isLoading, isError } = useSloka(chapter, number);
  const { data: allSlokas } = useChapterSlokas(chapter);
  const totalInChapter = allSlokas?.length ?? 0;

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const key = `bookmark_${chapter}_${number}`;
    setBookmarked(localStorage.getItem(key) === "1");
  }, [chapter, number]);

  const toggleBookmark = useCallback(() => {
    const key = `bookmark_${chapter}_${number}`;
    if (bookmarked) {
      localStorage.removeItem(key);
      setBookmarked(false);
      toast("Bookmark removed");
    } else {
      localStorage.setItem(key, "1");
      setBookmarked(true);
      toast("Sloka bookmarked ✦");
    }
  }, [bookmarked, chapter, number]);

  const langCode: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    te: "te-IN",
    sa: "sa-IN",
  };

  const playSanskrit = () => {
    if (speaking) {
      stop();
      return;
    }
    if (sloka) speak(sloka.sanskritText, "sa-IN");
  };

  const playMeaning = () => {
    if (speaking) {
      stop();
      return;
    }
    if (sloka) {
      const text = getTextForLanguage(
        sloka.meanings,
        language as "en" | "hi" | "te" | "sa",
      );
      speak(text, langCode[language] ?? "en-IN");
    }
  };

  const goNext = () => {
    if (number < totalInChapter) {
      navigate({
        to: "/sloka/$chapter/$number",
        params: { chapter: String(chapter), number: String(number + 1) },
      });
    }
  };

  const goPrev = () => {
    if (number > 1) {
      navigate({
        to: "/sloka/$chapter/$number",
        params: { chapter: String(chapter), number: String(number - 1) },
      });
    }
  };

  // ── Loading state ──
  if (isLoading) {
    return (
      <Layout>
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-6"
          data-ocid="sloka-detail.loading_state"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            <span className="absolute inset-0 flex items-center justify-center text-primary text-xl font-display">
              ॐ
            </span>
          </div>
          <p className="text-muted-foreground text-sm animate-glow-pulse">
            Loading sacred verse…
          </p>
        </div>
      </Layout>
    );
  }

  // ── Error / not found ──
  if (isError || !sloka) {
    return (
      <Layout>
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-5 px-4"
          data-ocid="sloka-detail.error_state"
        >
          <span className="text-5xl animate-float" aria-hidden="true">
            📿
          </span>
          <h2 className="font-display text-2xl text-foreground">
            Verse not found
          </h2>
          <p className="text-muted-foreground text-sm">
            Chapter {chapter}, Śloka {number} could not be found in the sacred
            texts.
          </p>
          <Button
            type="button"
            data-ocid="sloka-detail.back_button"
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
            onClick={() =>
              navigate({ to: "/chapter/$id", params: { id: String(chapter) } })
            }
          >
            Back to Chapter {chapter}
          </Button>
        </div>
      </Layout>
    );
  }

  const meaning = getTextForLanguage(
    sloka.meanings,
    language as "en" | "hi" | "te" | "sa",
  );
  const hasPrev = number > 1;
  const hasNext = totalInChapter > 0 ? number < totalInChapter : true;

  return (
    <Layout>
      <div className="min-h-screen bg-background" data-ocid="sloka-detail.page">
        {/* Top bar */}
        <div className="bg-card border-b border-border/40">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <Breadcrumb chapter={chapter} number={number} />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                data-ocid="sloka-detail.back_chapter_button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary gap-1.5"
                onClick={() =>
                  navigate({
                    to: "/chapter/$id",
                    params: { id: String(chapter) },
                  })
                }
              >
                <BookOpen className="w-3.5 h-3.5" />
                Chapter {chapter}
              </Button>
              <Button
                type="button"
                data-ocid="sloka-detail.bookmark_button"
                variant="ghost"
                size="icon"
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                className={`h-8 w-8 transition-smooth ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                onClick={toggleBookmark}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-0"
          >
            {/* Chapter/sloka badge */}
            <div className="flex items-center gap-2 mb-5">
              <Badge className="bg-primary/20 text-primary border-primary/30 font-display text-sm px-3 py-1">
                Chapter {chapter}
              </Badge>
              <Badge
                variant="secondary"
                className="font-body text-sm px-3 py-1"
              >
                Śloka {number}
              </Badge>
            </div>

            {/* Sanskrit verse */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="cosmic-card-golden rounded-2xl p-6 md:p-8 mb-2"
              data-ocid="sloka-detail.sanskrit_section"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-muted-foreground text-xs uppercase tracking-widest font-body">
                  {t("sloka.sanskrit")}
                </h2>
                {/* Sanskrit audio button */}
                <div className="relative flex items-center">
                  <AudioPulseRing active={speaking} />
                  <Button
                    type="button"
                    data-ocid="sloka-detail.play_sanskrit_button"
                    variant="ghost"
                    size="sm"
                    onClick={playSanskrit}
                    className={`gap-1.5 text-xs transition-smooth ${speaking ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                    aria-label={speaking ? t("audio.pause") : t("audio.play")}
                  >
                    {speaking ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    {speaking ? t("audio.pause") : t("audio.play")}
                  </Button>
                </div>
              </div>
              <p className="sanskrit-text text-primary glow-golden text-xl md:text-2xl leading-loose text-center">
                {sloka.sanskritText}
              </p>
            </motion.div>

            <GoldenDivider />

            {/* Transliteration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="cosmic-card rounded-xl p-5 mb-2"
              data-ocid="sloka-detail.transliteration_section"
            >
              <h2 className="text-muted-foreground text-xs uppercase tracking-widest font-body mb-3">
                {t("sloka.transliteration")}
              </h2>
              <p className="text-foreground/80 italic text-base leading-relaxed">
                {sloka.transliteration}
              </p>
            </motion.div>

            <GoldenDivider />

            {/* Meaning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.26 }}
              className="cosmic-card-golden rounded-xl p-5 mb-2"
              data-ocid="sloka-detail.meaning_section"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-muted-foreground text-xs uppercase tracking-widest font-body">
                  {t("sloka.meaning")}
                </h2>
                <Button
                  type="button"
                  data-ocid="sloka-detail.play_meaning_button"
                  variant="ghost"
                  size="sm"
                  onClick={playMeaning}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth"
                  aria-label="Play meaning audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen
                </Button>
              </div>
              <p className="text-foreground/90 text-base leading-relaxed">
                {meaning}
              </p>
            </motion.div>

            <GoldenDivider />

            {/* Explanation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="cosmic-card rounded-xl p-5"
              data-ocid="sloka-detail.explanation_section"
            >
              <h2 className="text-muted-foreground text-xs uppercase tracking-widest font-body mb-3">
                {t("sloka.explanation")}
              </h2>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {sloka.explanation}
              </p>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/30">
            <Button
              type="button"
              data-ocid="sloka-detail.prev_button"
              variant="outline"
              onClick={goPrev}
              disabled={!hasPrev}
              className="gap-2 border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-smooth disabled:opacity-30"
              aria-label="Previous sloka"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Śloka</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <span className="text-muted-foreground text-sm font-display">
              {number} / {totalInChapter || "…"}
            </span>

            <Button
              type="button"
              data-ocid="sloka-detail.next_button"
              variant="outline"
              onClick={goNext}
              disabled={!hasNext}
              className="gap-2 border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-smooth disabled:opacity-30"
              aria-label="Next sloka"
            >
              <span className="hidden sm:inline">Next Śloka</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

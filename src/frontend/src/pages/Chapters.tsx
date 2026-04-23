import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChapters } from "@/hooks/useGita";
import type { ChapterMeta } from "@/types/gita";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const DEVANAGARI_NUMERALS = [
  "१",
  "२",
  "३",
  "४",
  "५",
  "६",
  "७",
  "८",
  "९",
  "१०",
  "११",
  "१२",
  "१३",
  "१४",
  "१५",
  "१६",
  "१७",
  "१८",
];

function ChakraLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center py-32 gap-6"
      data-ocid="chapters.loading_state"
    >
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div
          className="absolute inset-2 rounded-full border border-primary/10 border-b-primary/60 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-primary glow-golden text-xl animate-glow-pulse">
            ॐ
          </span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm font-body animate-glow-pulse">
        Loading Chapters…
      </p>
    </div>
  );
}

interface ChapterCardProps {
  chapter: ChapterMeta;
  index: number;
}

function ChapterCard({ chapter, index }: ChapterCardProps) {
  const num = Number(chapter.chapterNumber);
  const devanagariNum = DEVANAGARI_NUMERALS[num - 1] ?? String(num);
  const summary =
    chapter.summary.length > 120
      ? `${chapter.summary.slice(0, 120)}…`
      : chapter.summary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="group relative"
      data-ocid={`chapters.item.${num}`}
    >
      <Link
        to="/chapter/$id"
        params={{ id: String(num) }}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
        aria-label={`Chapter ${num}: ${chapter.englishName}`}
      >
        <div className="cosmic-card-golden rounded-xl p-6 h-full flex flex-col gap-4 transition-smooth group-hover:glow-border-golden group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_oklch(0.68_0.18_60_/_0.15)]">
          {/* Chapter Number */}
          <div className="flex items-start justify-between">
            <span className="font-display text-5xl text-primary glow-golden leading-none select-none">
              {devanagariNum}
            </span>
            <span
              className="text-xs font-body font-medium px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary"
              data-ocid={`chapters.sloka_badge.${num}`}
            >
              {Number(chapter.totalSlokas)} Slokas
            </span>
          </div>

          {/* Names */}
          <div className="flex flex-col gap-1">
            <p className="sanskrit-text text-foreground text-lg font-semibold leading-snug">
              {chapter.sanskritName}
            </p>
            <p className="text-muted-foreground text-sm font-body">
              {chapter.englishName}
            </p>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3">
            {summary}
          </p>

          {/* CTA */}
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-body font-medium group-hover:gap-3 transition-smooth">
              Open Chapter
              <span className="text-xs opacity-70">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Chapters() {
  const { t } = useLanguage();
  const { data: chapters, isLoading, isError } = useChapters();

  return (
    <Layout>
      <div
        className="min-h-screen relative overflow-hidden"
        data-ocid="chapters.page"
      >
        {/* Cosmic background particles */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-10 left-[10%] w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-24 right-[20%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-float"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-40 left-[35%] w-1 h-1 rounded-full bg-primary/30 animate-float"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute top-60 right-[8%] w-2 h-2 rounded-full bg-primary/20 animate-float-slow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-40 left-[5%] w-1 h-1 rounded-full bg-accent/40 animate-float"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute bottom-20 right-[30%] w-1.5 h-1.5 rounded-full bg-primary/25 animate-float-slow"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Page Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Decorative Sanskrit line */}
            <p
              className="sanskrit-text text-primary/50 text-sm mb-4 animate-sanskrit-drift"
              aria-hidden="true"
            >
              ॐ तत्सत् • श्रीमद्भगवद्गीता
            </p>

            <h1 className="font-display text-4xl md:text-5xl divine-gradient-text mb-3">
              अध्याय — {t("nav.chapters")}
            </h1>

            <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4 opacity-60" />

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              The Bhagavad Gita contains{" "}
              <span className="text-primary font-medium">18 Adhyayas</span>,
              each revealing a facet of divine wisdom spoken by Sri Krishna on
              the battlefield of Kurukshetra.
            </p>
          </motion.div>

          {/* Content */}
          {isLoading && <ChakraLoader />}

          {isError && (
            <div
              className="flex flex-col items-center py-24 gap-4"
              data-ocid="chapters.error_state"
            >
              <span className="text-4xl">🪔</span>
              <p className="text-muted-foreground text-center">
                Could not load chapters. Please try again.
              </p>
            </div>
          )}

          {!isLoading && !isError && chapters && chapters.length === 0 && (
            <div
              className="flex flex-col items-center py-24 gap-4"
              data-ocid="chapters.empty_state"
            >
              <span className="font-display text-primary text-5xl glow-golden">
                ॐ
              </span>
              <p className="text-muted-foreground text-center max-w-xs">
                No chapters found. The sacred text is being prepared…
              </p>
            </div>
          )}

          {!isLoading && !isError && chapters && chapters.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="chapters.list"
            >
              {chapters.map((chapter, i) => (
                <ChapterCard
                  key={Number(chapter.chapterNumber)}
                  chapter={chapter}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

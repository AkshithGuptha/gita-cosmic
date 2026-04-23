import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useChapter, useChapterSlokas } from "@/hooks/useGita";
import type { Sloka } from "@/types/gita";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { BookOpen, ChevronLeft } from "lucide-react";
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

function SlokaSkeletonRow() {
  return (
    <div className="flex gap-4 p-5 rounded-xl cosmic-card animate-shimmer">
      <div className="w-10 h-10 rounded-full bg-muted/60 shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-muted/60 rounded w-3/4" />
        <div className="h-3 bg-muted/40 rounded w-1/2" />
      </div>
    </div>
  );
}

interface SlokaRowProps {
  sloka: Sloka;
  chapterId: string;
  index: number;
}

function SlokaRow({ sloka, chapterId, index }: SlokaRowProps) {
  const slokaNum = Number(sloka.slokaNumber);
  const firstLine =
    sloka.sanskritText.split("\n")[0]?.trim() ?? sloka.sanskritText;
  const truncatedSanskrit =
    firstLine.length > 60 ? `${firstLine.slice(0, 60)}…` : firstLine;
  const truncatedTrans =
    sloka.transliteration.length > 70
      ? `${sloka.transliteration.slice(0, 70)}…`
      : sloka.transliteration;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 1.2),
        ease: "easeOut",
      }}
      data-ocid={`chapter-detail.sloka.${slokaNum}`}
    >
      <Link
        to="/sloka/$chapter/$number"
        params={{ chapter: chapterId, number: String(slokaNum) }}
        className="group flex items-start gap-4 p-5 rounded-xl cosmic-card border border-border/30 hover:border-primary/40 transition-smooth hover:shadow-[0_0_24px_oklch(0.68_0.18_60_/_0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`Sloka ${slokaNum}`}
      >
        {/* Sloka Number Badge */}
        <div className="shrink-0 w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/70 transition-smooth">
          <span className="font-display text-primary text-sm font-semibold leading-none">
            {slokaNum}
          </span>
        </div>

        {/* Sloka Text */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <p className="sanskrit-text text-foreground text-sm leading-relaxed truncate group-hover:text-primary/90 transition-smooth">
            {truncatedSanskrit}
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed italic truncate">
            {truncatedTrans}
          </p>
        </div>

        <ChevronLeft
          className="shrink-0 text-muted-foreground/40 group-hover:text-primary/60 transition-smooth rotate-180"
          size={16}
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

export default function ChapterDetail() {
  const { id } = useParams({ from: "/chapter/$id" });
  const { t } = useLanguage();
  const navigate = useNavigate();

  const chapterId = Number.parseInt(id, 10);
  const { data: chapter, isLoading: chapterLoading } = useChapter(
    Number.isNaN(chapterId) ? undefined : chapterId,
  );
  const { data: slokas, isLoading: slokasLoading } = useChapterSlokas(
    Number.isNaN(chapterId) ? undefined : chapterId,
  );

  const isLoading = chapterLoading || slokasLoading;
  const num = chapter ? Number(chapter.chapterNumber) : chapterId;
  const devanagariNum = DEVANAGARI_NUMERALS[num - 1] ?? String(num);

  return (
    <Layout>
      <div
        className="min-h-screen relative overflow-hidden"
        data-ocid="chapter-detail.page"
      >
        {/* Cosmic background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute top-12 right-[15%] w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-32 left-[8%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-60 right-[5%] w-1 h-1 rounded-full bg-primary/30 animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 py-10 relative z-10 max-w-3xl">
          {/* Breadcrumb + Back */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/chapters" })}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm group"
              data-ocid="chapter-detail.back_button"
              aria-label="Back to Chapters"
            >
              <ChevronLeft
                size={15}
                className="group-hover:-translate-x-0.5 transition-smooth"
                aria-hidden="true"
              />
              {t("nav.chapters")}
            </button>

            <span className="text-border/60" aria-hidden="true">
              /
            </span>

            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {t("nav.home")}
                  </Link>
                </li>
                <li className="text-border/60" aria-hidden="true">
                  /
                </li>
                <li>
                  <Link
                    to="/chapters"
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {t("nav.chapters")}
                  </Link>
                </li>
                <li className="text-border/60" aria-hidden="true">
                  /
                </li>
                <li className="text-primary/80 font-medium truncate max-w-[160px]">
                  {chapter?.sanskritName ?? `Chapter ${id}`}
                </li>
              </ol>
            </nav>
          </motion.div>

          {/* Chapter Header */}
          {isLoading ? (
            <div
              className="flex flex-col gap-4 mb-10"
              data-ocid="chapter-detail.loading_state"
            >
              <div className="h-14 bg-muted/40 rounded-xl animate-shimmer w-2/3" />
              <div className="h-5 bg-muted/30 rounded w-1/3 animate-shimmer" />
              <div className="h-20 bg-muted/20 rounded-xl animate-shimmer" />
            </div>
          ) : chapter ? (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-start gap-5 mb-6">
                <span
                  className="font-display text-6xl text-primary glow-golden leading-none select-none shrink-0 mt-1"
                  aria-hidden="true"
                >
                  {devanagariNum}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h1 className="font-display text-3xl md:text-4xl divine-gradient-text leading-snug">
                    {chapter.sanskritName}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {chapter.englishName}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-1">
                    <BookOpen size={13} aria-hidden="true" />
                    {Number(chapter.totalSlokas)} Slokas
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />

              {/* Summary */}
              <div className="cosmic-card-golden rounded-xl p-5">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {chapter.summary}
                </p>
              </div>
            </motion.div>
          ) : (
            <div
              className="text-center py-20"
              data-ocid="chapter-detail.error_state"
            >
              <p className="text-muted-foreground">Chapter not found.</p>
            </div>
          )}

          {/* Slokas Section */}
          {!isLoading && chapter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <h2 className="font-display text-xl text-foreground">
                  श्लोक — Slokas
                </h2>
                <div className="flex-1 h-px bg-border/30" />
              </div>

              {slokasLoading && (
                <div
                  className="flex flex-col gap-3"
                  data-ocid="chapter-detail.slokas_loading"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                    <SlokaSkeletonRow key={i} />
                  ))}
                </div>
              )}

              {!slokasLoading && slokas && slokas.length === 0 && (
                <div
                  className="flex flex-col items-center py-16 gap-4"
                  data-ocid="chapter-detail.empty_state"
                >
                  <span className="font-display text-primary text-4xl glow-golden">
                    ॐ
                  </span>
                  <p className="text-muted-foreground text-sm text-center">
                    No slokas found for this chapter.
                  </p>
                </div>
              )}

              {!slokasLoading && slokas && slokas.length > 0 && (
                <div
                  className="flex flex-col gap-3"
                  data-ocid="chapter-detail.slokas_list"
                >
                  {slokas.map((sloka, i) => (
                    <SlokaRow
                      key={`${Number(sloka.chapterNumber)}-${Number(sloka.slokaNumber)}`}
                      sloka={sloka}
                      chapterId={id}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

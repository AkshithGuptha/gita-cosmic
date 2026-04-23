import { c as useParams, b as useLanguage, a as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-C-D9MR7Z.js";
import { L as Layout, B as BookOpen } from "./Layout-BURGsAja.js";
import { c as useChapter, d as useChapterSlokas, m as motion } from "./proxy-CpBPTVfg.js";
import { C as ChevronLeft } from "./chevron-left-DhORYQdd.js";
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
  "१८"
];
function SlokaSkeletonRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-5 rounded-xl cosmic-card animate-shimmer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted/60 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted/60 rounded w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted/40 rounded w-1/2" })
    ] })
  ] });
}
function SlokaRow({ sloka, chapterId, index }) {
  var _a;
  const slokaNum = Number(sloka.slokaNumber);
  const firstLine = ((_a = sloka.sanskritText.split("\n")[0]) == null ? void 0 : _a.trim()) ?? sloka.sanskritText;
  const truncatedSanskrit = firstLine.length > 60 ? `${firstLine.slice(0, 60)}…` : firstLine;
  const truncatedTrans = sloka.transliteration.length > 70 ? `${sloka.transliteration.slice(0, 70)}…` : sloka.transliteration;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: 0.4,
        delay: Math.min(index * 0.04, 1.2),
        ease: "easeOut"
      },
      "data-ocid": `chapter-detail.sloka.${slokaNum}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/sloka/$chapter/$number",
          params: { chapter: chapterId, number: String(slokaNum) },
          className: "group flex items-start gap-4 p-5 rounded-xl cosmic-card border border-border/30 hover:border-primary/40 transition-smooth hover:shadow-[0_0_24px_oklch(0.68_0.18_60_/_0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "aria-label": `Sloka ${slokaNum}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/70 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary text-sm font-semibold leading-none", children: slokaNum }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sanskrit-text text-foreground text-sm leading-relaxed truncate group-hover:text-primary/90 transition-smooth", children: truncatedSanskrit }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed italic truncate", children: truncatedTrans })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronLeft,
              {
                className: "shrink-0 text-muted-foreground/40 group-hover:text-primary/60 transition-smooth rotate-180",
                size: 16,
                "aria-hidden": "true"
              }
            )
          ]
        }
      )
    }
  );
}
function ChapterDetail() {
  const { id } = useParams({ from: "/chapter/$id" });
  const { t } = useLanguage();
  const navigate = useNavigate();
  const chapterId = Number.parseInt(id, 10);
  const { data: chapter, isLoading: chapterLoading } = useChapter(
    Number.isNaN(chapterId) ? void 0 : chapterId
  );
  const { data: slokas, isLoading: slokasLoading } = useChapterSlokas(
    Number.isNaN(chapterId) ? void 0 : chapterId
  );
  const isLoading = chapterLoading || slokasLoading;
  const num = chapter ? Number(chapter.chapterNumber) : chapterId;
  const devanagariNum = DEVANAGARI_NUMERALS[num - 1] ?? String(num);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen relative overflow-hidden",
      "data-ocid": "chapter-detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "pointer-events-none absolute inset-0 overflow-hidden",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-12 right-[15%] w-1 h-1 rounded-full bg-primary/40 animate-float",
                  style: { animationDelay: "0s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-32 left-[8%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-float",
                  style: { animationDelay: "2s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-60 right-[5%] w-1 h-1 rounded-full bg-primary/30 animate-float-slow",
                  style: { animationDelay: "1s" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 relative z-10 max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-wrap items-center gap-3 mb-8",
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/chapters" }),
                    className: "flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-smooth text-sm group",
                    "data-ocid": "chapter-detail.back_button",
                    "aria-label": "Back to Chapters",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronLeft,
                        {
                          size: 15,
                          className: "group-hover:-translate-x-0.5 transition-smooth",
                          "aria-hidden": "true"
                        }
                      ),
                      t("nav.chapters")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/60", "aria-hidden": "true", children: "/" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "text-muted-foreground hover:text-primary transition-smooth",
                      children: t("nav.home")
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-border/60", "aria-hidden": "true", children: "/" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/chapters",
                      className: "text-muted-foreground hover:text-primary transition-smooth",
                      children: t("nav.chapters")
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-border/60", "aria-hidden": "true", children: "/" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-primary/80 font-medium truncate max-w-[160px]", children: (chapter == null ? void 0 : chapter.sanskritName) ?? `Chapter ${id}` })
                ] }) })
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-4 mb-10",
              "data-ocid": "chapter-detail.loading_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 bg-muted/40 rounded-xl animate-shimmer w-2/3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted/30 rounded w-1/3 animate-shimmer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-muted/20 rounded-xl animate-shimmer" })
              ]
            }
          ) : chapter ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "mb-10",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display text-6xl text-primary glow-golden leading-none select-none shrink-0 mt-1",
                      "aria-hidden": "true",
                      children: devanagariNum
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl divine-gradient-text leading-snug", children: chapter.sanskritName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: chapter.englishName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 13, "aria-hidden": "true" }),
                      Number(chapter.totalSlokas),
                      " Slokas"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cosmic-card-golden rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: chapter.summary }) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-20",
              "data-ocid": "chapter-detail.error_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Chapter not found." })
            }
          ),
          !isLoading && chapter && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 0.3 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: "श्लोक — Slokas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/30" })
                ] }),
                slokasLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex flex-col gap-3",
                    "data-ocid": "chapter-detail.slokas_loading",
                    children: Array.from({ length: 6 }).map((_, i) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SlokaSkeletonRow, {}, i)
                    ))
                  }
                ),
                !slokasLoading && slokas && slokas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center py-16 gap-4",
                    "data-ocid": "chapter-detail.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary text-4xl glow-golden", children: "ॐ" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center", children: "No slokas found for this chapter." })
                    ]
                  }
                ),
                !slokasLoading && slokas && slokas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex flex-col gap-3",
                    "data-ocid": "chapter-detail.slokas_list",
                    children: slokas.map((sloka, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SlokaRow,
                      {
                        sloka,
                        chapterId: id,
                        index: i
                      },
                      `${Number(sloka.chapterNumber)}-${Number(sloka.slokaNumber)}`
                    ))
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  ChapterDetail as default
};

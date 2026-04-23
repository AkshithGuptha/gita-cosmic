import { b as useLanguage, j as jsxRuntimeExports, L as Link } from "./index-C-D9MR7Z.js";
import { L as Layout } from "./Layout-BURGsAja.js";
import { b as useChapters, m as motion } from "./proxy-CpBPTVfg.js";
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
function ChakraLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-32 gap-6",
      "data-ocid": "chapters.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-20 h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-2 rounded-full border border-primary/10 border-b-primary/60 animate-spin",
              style: { animationDirection: "reverse", animationDuration: "1.5s" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary glow-golden text-xl animate-glow-pulse", children: "ॐ" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body animate-glow-pulse", children: "Loading Chapters…" })
      ]
    }
  );
}
function ChapterCard({ chapter, index }) {
  const num = Number(chapter.chapterNumber);
  const devanagariNum = DEVANAGARI_NUMERALS[num - 1] ?? String(num);
  const summary = chapter.summary.length > 120 ? `${chapter.summary.slice(0, 120)}…` : chapter.summary;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.06, ease: "easeOut" },
      className: "group relative",
      "data-ocid": `chapters.item.${num}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/chapter/$id",
          params: { id: String(num) },
          className: "block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl",
          "aria-label": `Chapter ${num}: ${chapter.englishName}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cosmic-card-golden rounded-xl p-6 h-full flex flex-col gap-4 transition-smooth group-hover:glow-border-golden group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_oklch(0.68_0.18_60_/_0.15)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl text-primary glow-golden leading-none select-none", children: devanagariNum }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-body font-medium px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary",
                  "data-ocid": `chapters.sloka_badge.${num}`,
                  children: [
                    Number(chapter.totalSlokas),
                    " Slokas"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sanskrit-text text-foreground text-lg font-semibold leading-snug", children: chapter.sanskritName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: chapter.englishName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-3", children: summary }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-primary text-sm font-body font-medium group-hover:gap-3 transition-smooth", children: [
              "Open Chapter",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-70", children: "→" })
            ] }) })
          ] })
        }
      )
    }
  );
}
function Chapters() {
  const { t } = useLanguage();
  const { data: chapters, isLoading, isError } = useChapters();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen relative overflow-hidden",
      "data-ocid": "chapters.page",
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
                  className: "absolute top-10 left-[10%] w-1 h-1 rounded-full bg-primary/40 animate-float",
                  style: { animationDelay: "0s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-24 right-[20%] w-1.5 h-1.5 rounded-full bg-accent/30 animate-float",
                  style: { animationDelay: "1.5s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-40 left-[35%] w-1 h-1 rounded-full bg-primary/30 animate-float",
                  style: { animationDelay: "3s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-60 right-[8%] w-2 h-2 rounded-full bg-primary/20 animate-float-slow",
                  style: { animationDelay: "2s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-40 left-[5%] w-1 h-1 rounded-full bg-accent/40 animate-float",
                  style: { animationDelay: "4s" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-20 right-[30%] w-1.5 h-1.5 rounded-full bg-primary/25 animate-float-slow",
                  style: { animationDelay: "0.5s" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-14",
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "sanskrit-text text-primary/50 text-sm mb-4 animate-sanskrit-drift",
                    "aria-hidden": "true",
                    children: "ॐ तत्सत् • श्रीमद्भगवद्गीता"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl divine-gradient-text mb-3", children: [
                  "अध्याय — ",
                  t("nav.chapters")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-px mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4 opacity-60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed", children: [
                  "The Bhagavad Gita contains",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "18 Adhyayas" }),
                  ", each revealing a facet of divine wisdom spoken by Sri Krishna on the battlefield of Kurukshetra."
                ] })
              ]
            }
          ),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ChakraLoader, {}),
          isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-24 gap-4",
              "data-ocid": "chapters.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🪔" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center", children: "Could not load chapters. Please try again." })
              ]
            }
          ),
          !isLoading && !isError && chapters && chapters.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-24 gap-4",
              "data-ocid": "chapters.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary text-5xl glow-golden", children: "ॐ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center max-w-xs", children: "No chapters found. The sacred text is being prepared…" })
              ]
            }
          ),
          !isLoading && !isError && chapters && chapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
              "data-ocid": "chapters.list",
              children: chapters.map((chapter, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChapterCard,
                {
                  chapter,
                  index: i
                },
                Number(chapter.chapterNumber)
              ))
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  Chapters as default
};

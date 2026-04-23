import { c as useParams, a as useNavigate, b as useLanguage, r as reactExports, d as ue, j as jsxRuntimeExports } from "./index-C-D9MR7Z.js";
import { c as createLucideIcon, L as Layout, B as BookOpen, V as VolumeX, a as Volume2, H as House } from "./Layout-BURGsAja.js";
import { B as Button, g as getTextForLanguage, a as Badge, A as AnimatePresence } from "./index-Br6ZAec-.js";
import { e as useSloka, d as useChapterSlokas, m as motion } from "./proxy-CpBPTVfg.js";
import { C as ChevronLeft } from "./chevron-left-DhORYQdd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function useSpeechSynth() {
  const [speaking, setSpeaking] = reactExports.useState(false);
  const utterRef = reactExports.useRef(null);
  const speak = reactExports.useCallback((text, lang = "sa-IN") => {
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
  const stop = reactExports.useCallback(() => {
    var _a;
    (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
    setSpeaking(false);
  }, []);
  reactExports.useEffect(
    () => () => {
      var _a;
      (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
    },
    []
  );
  return { speaking, speak, stop };
}
function AudioPulseRing({ active }) {
  if (!active) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      initial: { scale: 0.8, opacity: 0.8 },
      animate: { scale: 1.6, opacity: 0 },
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut"
      },
      className: "absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
    },
    "pulse"
  ) });
}
function GoldenDivider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/60 text-xs font-display", children: "✦" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" })
  ] });
}
function Breadcrumb({ chapter, number }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: "flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "sloka-detail.breadcrumb.home",
            onClick: () => navigate({ to: "/" }),
            className: "hover:text-primary transition-smooth flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3 h-3" }),
              " Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "sloka-detail.breadcrumb.chapters",
            onClick: () => navigate({ to: "/chapters" }),
            className: "hover:text-primary transition-smooth",
            children: "Chapters"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "sloka-detail.breadcrumb.chapter",
            onClick: () => navigate({ to: "/chapter/$id", params: { id: String(chapter) } }),
            className: "hover:text-primary transition-smooth",
            children: [
              "Chapter ",
              chapter
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          "Śloka ",
          number
        ] })
      ]
    }
  );
}
function SlokaDetail() {
  const { chapter: chapterParam, number: numberParam } = useParams({
    from: "/sloka/$chapter/$number"
  });
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { speaking, speak, stop } = useSpeechSynth();
  const chapter = Number(chapterParam);
  const number = Number(numberParam);
  const { data: sloka, isLoading, isError } = useSloka(chapter, number);
  const { data: allSlokas } = useChapterSlokas(chapter);
  const totalInChapter = (allSlokas == null ? void 0 : allSlokas.length) ?? 0;
  const [bookmarked, setBookmarked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const key = `bookmark_${chapter}_${number}`;
    setBookmarked(localStorage.getItem(key) === "1");
  }, [chapter, number]);
  const toggleBookmark = reactExports.useCallback(() => {
    const key = `bookmark_${chapter}_${number}`;
    if (bookmarked) {
      localStorage.removeItem(key);
      setBookmarked(false);
      ue("Bookmark removed");
    } else {
      localStorage.setItem(key, "1");
      setBookmarked(true);
      ue("Sloka bookmarked ✦");
    }
  }, [bookmarked, chapter, number]);
  const langCode = {
    en: "en-IN",
    hi: "hi-IN",
    te: "te-IN",
    sa: "sa-IN"
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
        language
      );
      speak(text, langCode[language] ?? "en-IN");
    }
  };
  const goNext = () => {
    if (number < totalInChapter) {
      navigate({
        to: "/sloka/$chapter/$number",
        params: { chapter: String(chapter), number: String(number + 1) }
      });
    }
  };
  const goPrev = () => {
    if (number > 1) {
      navigate({
        to: "/sloka/$chapter/$number",
        params: { chapter: String(chapter), number: String(number - 1) }
      });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen flex flex-col items-center justify-center gap-6",
        "data-ocid": "sloka-detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center text-primary text-xl font-display", children: "ॐ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm animate-glow-pulse", children: "Loading sacred verse…" })
        ]
      }
    ) });
  }
  if (isError || !sloka) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen flex flex-col items-center justify-center gap-5 px-4",
        "data-ocid": "sloka-detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl animate-float", "aria-hidden": "true", children: "📿" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "Verse not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "Chapter ",
            chapter,
            ", Śloka ",
            number,
            " could not be found in the sacred texts."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "sloka-detail.back_button",
              variant: "outline",
              className: "border-primary/30 text-primary hover:bg-primary/10",
              onClick: () => navigate({ to: "/chapter/$id", params: { id: String(chapter) } }),
              children: [
                "Back to Chapter ",
                chapter
              ]
            }
          )
        ]
      }
    ) });
  }
  const meaning = getTextForLanguage(
    sloka.meanings,
    language
  );
  const hasPrev = number > 1;
  const hasNext = totalInChapter > 0 ? number < totalInChapter : true;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "sloka-detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { chapter, number }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "sloka-detail.back_chapter_button",
            variant: "ghost",
            size: "sm",
            className: "text-muted-foreground hover:text-primary gap-1.5",
            onClick: () => navigate({
              to: "/chapter/$id",
              params: { id: String(chapter) }
            }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              "Chapter ",
              chapter
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            "data-ocid": "sloka-detail.bookmark_button",
            variant: "ghost",
            size: "icon",
            "aria-label": bookmarked ? "Remove bookmark" : "Add bookmark",
            className: `h-8 w-8 transition-smooth ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-primary"}`,
            onClick: toggleBookmark,
            children: bookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "flex flex-col gap-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/20 text-primary border-primary/30 font-display text-sm px-3 py-1", children: [
                "Chapter ",
                chapter
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "font-body text-sm px-3 py-1",
                  children: [
                    "Śloka ",
                    number
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.1 },
                className: "cosmic-card-golden rounded-2xl p-6 md:p-8 mb-2",
                "data-ocid": "sloka-detail.sanskrit_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-muted-foreground text-xs uppercase tracking-widest font-body", children: t("sloka.sanskrit") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AudioPulseRing, { active: speaking }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          type: "button",
                          "data-ocid": "sloka-detail.play_sanskrit_button",
                          variant: "ghost",
                          size: "sm",
                          onClick: playSanskrit,
                          className: `gap-1.5 text-xs transition-smooth ${speaking ? "text-primary" : "text-muted-foreground hover:text-primary"}`,
                          "aria-label": speaking ? t("audio.pause") : t("audio.play"),
                          children: [
                            speaking ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5" }),
                            speaking ? t("audio.pause") : t("audio.play")
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sanskrit-text text-primary glow-golden text-xl md:text-2xl leading-loose text-center", children: sloka.sanskritText })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenDivider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.18 },
                className: "cosmic-card rounded-xl p-5 mb-2",
                "data-ocid": "sloka-detail.transliteration_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-muted-foreground text-xs uppercase tracking-widest font-body mb-3", children: t("sloka.transliteration") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 italic text-base leading-relaxed", children: sloka.transliteration })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenDivider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.26 },
                className: "cosmic-card-golden rounded-xl p-5 mb-2",
                "data-ocid": "sloka-detail.meaning_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-muted-foreground text-xs uppercase tracking-widest font-body", children: t("sloka.meaning") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "sloka-detail.play_meaning_button",
                        variant: "ghost",
                        size: "sm",
                        onClick: playMeaning,
                        className: "gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth",
                        "aria-label": "Play meaning audio",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5" }),
                          "Listen"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 text-base leading-relaxed", children: meaning })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenDivider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.34 },
                className: "cosmic-card rounded-xl p-5",
                "data-ocid": "sloka-detail.explanation_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-muted-foreground text-xs uppercase tracking-widest font-body mb-3", children: t("sloka.explanation") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-sm leading-relaxed", children: sloka.explanation })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-10 pt-6 border-t border-border/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "sloka-detail.prev_button",
            variant: "outline",
            onClick: goPrev,
            disabled: !hasPrev,
            className: "gap-2 border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-smooth disabled:opacity-30",
            "aria-label": "Previous sloka",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Prev Śloka" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Prev" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm font-display", children: [
          number,
          " / ",
          totalInChapter || "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            "data-ocid": "sloka-detail.next_button",
            variant: "outline",
            onClick: goNext,
            disabled: !hasNext,
            className: "gap-2 border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-smooth disabled:opacity-30",
            "aria-label": "Next sloka",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Next Śloka" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Next" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  SlokaDetail as default
};

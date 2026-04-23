import { j as jsxRuntimeExports, b as useLanguage, a as useNavigate, r as reactExports } from "./index-C-D9MR7Z.js";
import { c as createLucideIcon, L as Layout, S as Search, B as BookOpen } from "./Layout-BURGsAja.js";
import { c as cn, B as Button, A as AnimatePresence, g as getTextForLanguage, a as Badge } from "./index-Br6ZAec-.js";
import { f as useSearchSlokas, m as motion } from "./proxy-CpBPTVfg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const MicOff = createLucideIcon("mic-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const Mic = createLucideIcon("mic", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const LANG_CODE = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
  sa: "sa-IN"
};
function parseSlokaQuery(query) {
  const patterns = [
    /chapter\s*(\d+)\s*(?:sloka|shloka|verse|shlok)\s*(\d+)/i,
    /adhyaya\s*(\d+)\s*(?:sloka|shloka|verse|shlok)\s*(\d+)/i,
    /ch\s*\.?\s*(\d+)\s*[,\s]+(?:v|s)\.?\s*(\d+)/i,
    /(\d+)\.(\d+)/
  ];
  for (const pat of patterns) {
    const m = query.match(pat);
    if (m) return { chapter: Number(m[1]), number: Number(m[2]) };
  }
  return null;
}
function VoiceWaveform() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-[3px] h-6", "aria-hidden": "true", children: [0.6, 1, 0.75, 1, 0.5, 0.85, 0.65].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "w-[3px] rounded-full bg-primary",
      animate: { scaleY: [h, 1, h * 0.6, 1, h] },
      transition: {
        duration: 0.8 + i * 0.08,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      },
      style: { height: "100%", originY: 1 }
    },
    `bar-${i}`
  )) });
}
function SlokaCard({
  sloka,
  index,
  language
}) {
  const navigate = useNavigate();
  const ch = Number(sloka.chapterNumber);
  const num = Number(sloka.slokaNumber);
  const meaning = getTextForLanguage(
    sloka.meanings,
    language
  );
  const handleCardNav = () => navigate({
    to: "/sloka/$chapter/$number",
    params: { chapter: String(ch), number: String(num) }
  });
  const handleCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardNav();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      "data-ocid": `search.result.item.${index + 1}`,
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.06 },
      className: "cosmic-card-golden rounded-xl p-5 flex flex-col gap-3 hover:border-primary/50 transition-smooth cursor-pointer group text-left w-full",
      onClick: handleCardNav,
      onKeyDown: handleCardKeyDown,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/20 text-primary border-primary/30 text-xs font-display", children: [
            "Ch. ",
            ch
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            "Śloka ",
            num
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sanskrit-text text-primary glow-golden text-base leading-relaxed line-clamp-2", children: sloka.sanskritText }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm italic line-clamp-1", children: sloka.transliteration }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-sm line-clamp-2", children: meaning }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            "data-ocid": `search.view_sloka_button.${index + 1}`,
            className: "text-primary hover:text-primary hover:bg-primary/10 gap-1.5 transition-smooth group-hover:translate-x-1 transition-transform",
            onClick: (e) => {
              e.stopPropagation();
              navigate({
                to: "/sloka/$chapter/$number",
                params: { chapter: String(ch), number: String(num) }
              });
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              "View Sloka"
            ]
          }
        ) })
      ]
    }
  );
}
function SearchPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [listening, setListening] = reactExports.useState(false);
  const [speechSupported, setSpeechSupported] = reactExports.useState(true);
  const recognitionRef = reactExports.useRef(null);
  const { data, isLoading } = useSearchSlokas(searchTerm);
  const results = (data == null ? void 0 : data.items) ?? [];
  reactExports.useEffect(() => {
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) setSpeechSupported(false);
  }, []);
  const handleSearch = reactExports.useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const direct = parseSlokaQuery(trimmed);
    if (direct) {
      navigate({
        to: "/sloka/$chapter/$number",
        params: {
          chapter: String(direct.chapter),
          number: String(direct.number)
        }
      });
      return;
    }
    setSearchTerm(trimmed);
  }, [query, navigate]);
  const toggleVoice = reactExports.useCallback(() => {
    var _a;
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      (_a = recognitionRef.current) == null ? void 0 : _a.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = LANG_CODE[language] ?? "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      var _a2, _b;
      const transcript = ((_b = (_a2 = e.results[0]) == null ? void 0 : _a2[0]) == null ? void 0 : _b.transcript) ?? "";
      setQuery(transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, [listening, language]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const suggestions = [
    "Chapter 2 Sloka 47",
    "Karma Yoga",
    "Adhyaya 3 Verse 16",
    "Nishkama Karma"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border-b border-border/40 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[120px]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 relative z-10 flex flex-col items-center text-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-primary animate-glow-pulse mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl divine-gradient-text mb-1", children: "Seek Divine Wisdom" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-md mx-auto", children: "Search by chapter & sloka number, topic, or ask in your language" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.15 },
            className: "w-full max-w-2xl mt-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      "data-ocid": "search.search_input",
                      type: "text",
                      value: query,
                      onChange: (e) => setQuery(e.target.value),
                      onKeyDown: handleKeyDown,
                      placeholder: t("search.placeholder"),
                      className: "pl-10 pr-4 py-6 text-base bg-secondary/60 border-primary/20 focus:border-primary/50 rounded-xl",
                      "aria-label": "Search slokas"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "search.voice_button",
                    onClick: toggleVoice,
                    disabled: !speechSupported,
                    variant: "outline",
                    size: "icon",
                    className: `h-12 w-12 rounded-xl border-primary/30 flex-shrink-0 transition-smooth ${listening ? "bg-primary/20 border-primary animate-glow-pulse" : "hover:bg-primary/10"}`,
                    "aria-label": listening ? "Stop listening" : "Start voice input",
                    title: !speechSupported ? "Voice not supported in this browser" : "",
                    children: listening ? /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceWaveform, {}) : speechSupported ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-5 h-5 text-muted-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "search.submit_button",
                    onClick: handleSearch,
                    className: "h-12 px-6 rounded-xl divine-gradient text-primary-foreground font-display flex-shrink-0 hover:opacity-90 transition-smooth",
                    children: "Search"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
                listening && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    className: "text-primary text-sm mt-2 flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3.5 h-3.5 animate-glow-pulse" }),
                      "Listening… speak your query"
                    ]
                  }
                ),
                !speechSupported && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className: "text-muted-foreground text-xs mt-2",
                    children: "Voice input is not supported in this browser. Please type your query."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-4 justify-center", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `search.suggestion.${s.toLowerCase().replace(/\s+/g, "_")}`,
                  onClick: () => {
                    setQuery(s);
                    setSearchTerm(s);
                  },
                  className: "px-3 py-1 rounded-full text-xs border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-smooth",
                  children: s
                },
                s
              )) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10 max-w-3xl", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "search.loading_state",
          className: "flex flex-col items-center gap-6 py-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm animate-glow-pulse", children: "Searching the sacred texts…" })
          ]
        }
      ),
      !isLoading && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "text-muted-foreground text-sm mb-6",
            children: [
              "Found",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-display", children: Number((data == null ? void 0 : data.totalCount) ?? 0) }),
              " ",
              "sacred verses for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground italic", children: [
                '"',
                searchTerm,
                '"'
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-col gap-4",
            "data-ocid": "search.results.list",
            children: results.map((sloka, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SlokaCard,
              {
                sloka,
                index: i,
                language
              },
              `${sloka.chapterNumber}-${sloka.slokaNumber}`
            ))
          }
        )
      ] }),
      !isLoading && searchTerm && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": "search.empty_state",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center text-center gap-5 py-20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl animate-float", "aria-hidden": "true", children: "🪷" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: "No verses found for this query" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: 'The Gita holds 700 verses — try searching by chapter number, topic like "karma" or "dharma", or ask directly: "Chapter 2 Sloka 47"' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                "data-ocid": "search.browse_chapters_button",
                className: "border-primary/30 text-primary hover:bg-primary/10",
                onClick: () => navigate({ to: "/chapters" }),
                children: "Browse All Chapters"
              }
            )
          ]
        }
      ),
      !isLoading && !searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "flex flex-col items-center text-center gap-6 py-20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full border border-primary/20 glow-border-golden flex items-center justify-center animate-glow-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display text-primary", children: "ॐ" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg text-foreground/80 mb-1", children: "Begin your search for divine wisdom" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Type a topic, chapter reference, or use your voice to seek guidance" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 w-full max-w-sm mt-2 text-left", children: [
              { label: "By reference", eg: "Chapter 2 Sloka 47" },
              { label: "By topic", eg: "Karma Yoga" },
              { label: "By keyword", eg: "Nishkama" },
              { label: "By concept", eg: "Self-realization" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cosmic-card rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/70 text-xs italic mt-0.5", children: [
                '"',
                item.eg,
                '"'
              ] })
            ] }, item.label)) })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  SearchPage as default
};

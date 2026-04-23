import { r as reactExports, b as useLanguage, j as jsxRuntimeExports, L as Link } from "./index-C-D9MR7Z.js";
import { a as useAudio } from "./proxy-CpBPTVfg.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 18h16", key: "19g7jn" }],
  ["path", { d: "M4 6h16", key: "1o0s65" }]
];
const Menu = createLucideIcon("menu", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const LANGUAGE_OPTIONS = [
  { value: "en", label: "EN", full: "English" },
  { value: "hi", label: "HI", full: "हिन्दी" },
  { value: "te", label: "TE", full: "తెలుగు" },
  { value: "sa", label: "SA", full: "संस्कृत" }
];
function CosmicParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 6
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 pointer-events-none overflow-hidden",
      "aria-hidden": "true",
      children: [
        particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full opacity-40",
            style: {
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.id % 3 === 0 ? "oklch(0.68 0.18 60)" : p.id % 3 === 1 ? "oklch(0.72 0.16 270)" : "oklch(0.85 0.08 60)",
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`
            }
          },
          p.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-20",
            style: {
              background: "radial-gradient(ellipse at 20% 50%, oklch(0.72 0.16 270 / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, oklch(0.68 0.18 60 / 0.2) 0%, transparent 40%)"
            }
          }
        )
      ]
    }
  );
}
function Layout({ children, fullscreen = false }) {
  var _a;
  const { language, setLanguage, t } = useLanguage();
  const { isPlaying, toggle } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = reactExports.useState(false);
  const navItems = [
    { to: "/", label: t("nav.home"), icon: House, ocid: "nav.home_link" },
    {
      to: "/chapters",
      label: t("nav.chapters"),
      icon: BookOpen,
      ocid: "nav.chapters_link"
    },
    {
      to: "/search",
      label: t("nav.search"),
      icon: Search,
      ocid: "nav.search_link"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CosmicParticles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 bg-card border-b border-primary/20 backdrop-blur-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 group",
            "data-ocid": "nav.logo_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-primary glow-golden transition-smooth group-hover:opacity-80", children: "ॐ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-foreground tracking-wide hidden sm:block", children: "गीता" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-1", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
            activeProps: { className: "text-primary bg-primary/10" },
            "data-ocid": item.ocid,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" }),
              item.label
            ]
          },
          item.to
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggle,
              className: "p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
              "aria-label": isPlaying ? "Pause ambient music" : "Play ambient music",
              "data-ocid": "nav.music_toggle",
              children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setLangDropdownOpen((v) => !v),
                className: "flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-body font-medium hover:bg-primary/10 transition-smooth",
                "data-ocid": "nav.language_select",
                children: [
                  ((_a = LANGUAGE_OPTIONS.find((l) => l.value === language)) == null ? void 0 : _a.label) ?? "EN",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "w-3 h-3 opacity-60",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M19 9l-7 7-7-7"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            langDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-lg shadow-glow-accent overflow-hidden z-50", children: LANGUAGE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setLanguage(opt.value);
                  setLangDropdownOpen(false);
                },
                className: `w-full flex items-center gap-2 px-3 py-2 text-xs font-body transition-smooth hover:bg-primary/10 hover:text-primary ${language === opt.value ? "text-primary bg-primary/10" : "text-foreground"}`,
                "data-ocid": `nav.lang_option.${opt.value}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium w-6", children: opt.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: opt.full })
                ]
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMobileMenuOpen((v) => !v),
              className: "md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
              "aria-label": "Toggle mobile menu",
              "data-ocid": "nav.mobile_menu_toggle",
              children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden border-t border-primary/20 bg-card/95 backdrop-blur-md px-4 py-2 flex flex-col gap-1", children: navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          onClick: () => setMobileMenuOpen(false),
          className: "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
          activeProps: { className: "text-primary bg-primary/10" },
          "data-ocid": `${item.ocid}_mobile`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" }),
            item.label
          ]
        },
        item.to
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: `flex-1 relative z-10 ${fullscreen ? "" : "pt-16"}`, children }),
    !fullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative z-10 border-t border-primary/20 bg-card/80 backdrop-blur-md py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-primary glow-golden text-xl mb-2", children: "ॐ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1", children: "— Bhagavad Gita 18.66" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 font-body mt-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary/70 hover:text-primary transition-smooth",
            children: "caffeine.ai"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  BookOpen as B,
  House as H,
  Layout as L,
  Search as S,
  VolumeX as V,
  Volume2 as a,
  createLucideIcon as c
};

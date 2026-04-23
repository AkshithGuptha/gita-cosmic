import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/hooks/useAudio";
import type { Language } from "@/types/gita";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Home,
  Menu,
  Search,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";

const LANGUAGE_OPTIONS: { value: Language; label: string; full: string }[] = [
  { value: "en", label: "EN", full: "English" },
  { value: "hi", label: "HI", full: "हिन्दी" },
  { value: "te", label: "TE", full: "తెలుగు" },
  { value: "sa", label: "SA", full: "संस्कृत" },
];

function CosmicParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 6,
  }));

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-40"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background:
              p.id % 3 === 0
                ? "oklch(0.68 0.18 60)"
                : p.id % 3 === 1
                  ? "oklch(0.72 0.16 270)"
                  : "oklch(0.85 0.08 60)",
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.72 0.16 270 / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, oklch(0.68 0.18 60 / 0.2) 0%, transparent 40%)",
        }}
      />
    </div>
  );
}

interface LayoutProps {
  children: ReactNode;
  fullscreen?: boolean;
}

export function Layout({ children, fullscreen = false }: LayoutProps) {
  const { language, setLanguage, t } = useLanguage();
  const { isPlaying, toggle } = useAudio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("nav.home"), icon: Home, ocid: "nav.home_link" },
    {
      to: "/chapters",
      label: t("nav.chapters"),
      icon: BookOpen,
      ocid: "nav.chapters_link",
    },
    {
      to: "/search",
      label: t("nav.search"),
      icon: Search,
      ocid: "nav.search_link",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <CosmicParticles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-primary/20 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.logo_link"
          >
            <span className="font-display text-2xl text-primary glow-golden transition-smooth group-hover:opacity-80">
              ॐ
            </span>
            <span className="font-display text-lg text-foreground tracking-wide hidden sm:block">
              गीता
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                activeProps={{ className: "text-primary bg-primary/10" }}
                data-ocid={item.ocid}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Music toggle */}
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
              aria-label={
                isPlaying ? "Pause ambient music" : "Play ambient music"
              }
              data-ocid="nav.music_toggle"
            >
              {isPlaying ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-body font-medium hover:bg-primary/10 transition-smooth"
                data-ocid="nav.language_select"
              >
                {LANGUAGE_OPTIONS.find((l) => l.value === language)?.label ??
                  "EN"}
                <svg
                  className="w-3 h-3 opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-popover border border-border rounded-lg shadow-glow-accent overflow-hidden z-50">
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() => {
                        setLanguage(opt.value);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-body transition-smooth hover:bg-primary/10 hover:text-primary ${language === opt.value ? "text-primary bg-primary/10" : "text-foreground"}`}
                      data-ocid={`nav.lang_option.${opt.value}`}
                    >
                      <span className="font-medium w-6">{opt.label}</span>
                      <span className="text-muted-foreground">{opt.full}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
              aria-label="Toggle mobile menu"
              data-ocid="nav.mobile_menu_toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-primary/20 bg-card/95 backdrop-blur-md px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                activeProps={{ className: "text-primary bg-primary/10" }}
                data-ocid={`${item.ocid}_mobile`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className={`flex-1 relative z-10 ${fullscreen ? "" : "pt-16"}`}>
        {children}
      </main>

      {/* Footer */}
      {!fullscreen && (
        <footer className="relative z-10 border-t border-primary/20 bg-card/80 backdrop-blur-md py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="font-display text-primary glow-golden text-xl mb-2">
              ॐ
            </div>
            <p className="text-xs text-muted-foreground font-body">
              सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              — Bhagavad Gita 18.66
            </p>
            <p className="text-xs text-muted-foreground/50 font-body mt-4">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-smooth"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

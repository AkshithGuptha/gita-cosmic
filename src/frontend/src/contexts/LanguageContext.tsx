import type { Language } from "@/types/gita";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TranslationKey =
  | "nav.home"
  | "nav.chapters"
  | "nav.search"
  | "search.placeholder"
  | "sloka.sanskrit"
  | "sloka.meaning"
  | "sloka.transliteration"
  | "sloka.explanation"
  | "audio.play"
  | "audio.pause";

type Translations = Record<TranslationKey, string>;

const translations: Record<Language, Translations> = {
  en: {
    "nav.home": "Home",
    "nav.chapters": "Chapters",
    "nav.search": "Search",
    "search.placeholder": "Search slokas by keyword or chapter...",
    "sloka.sanskrit": "Sanskrit",
    "sloka.meaning": "Meaning",
    "sloka.transliteration": "Transliteration",
    "sloka.explanation": "Explanation",
    "audio.play": "Play",
    "audio.pause": "Pause",
  },
  hi: {
    "nav.home": "होम",
    "nav.chapters": "अध्याय",
    "nav.search": "खोज",
    "search.placeholder": "श्लोक खोजें...",
    "sloka.sanskrit": "संस्कृत",
    "sloka.meaning": "अर्थ",
    "sloka.transliteration": "लिप्यंतरण",
    "sloka.explanation": "विवरण",
    "audio.play": "चलाएं",
    "audio.pause": "रोकें",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.chapters": "అధ్యాయాలు",
    "nav.search": "శోధన",
    "search.placeholder": "శ్లోకాలు వెతకండి...",
    "sloka.sanskrit": "సంస్కృతం",
    "sloka.meaning": "అర్థం",
    "sloka.transliteration": "లిప్యంతరీకరణ",
    "sloka.explanation": "వివరణ",
    "audio.play": "ప్లే",
    "audio.pause": "పాజ్",
  },
  sa: {
    "nav.home": "गृहम्",
    "nav.chapters": "अध्यायाः",
    "nav.search": "अन्वेषणम्",
    "search.placeholder": "श्लोकान् अन्विष्यतु...",
    "sloka.sanskrit": "संस्कृतम्",
    "sloka.meaning": "अर्थः",
    "sloka.transliteration": "लिप्यन्तरणम्",
    "sloka.explanation": "विवरणम्",
    "audio.play": "वादयतु",
    "audio.pause": "विरमतु",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("gita_language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("gita_language", language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

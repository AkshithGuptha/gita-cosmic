export type Language = "en" | "hi" | "te" | "sa";

export interface MultiLangText {
  english: string;
  hindi: string;
  telugu: string;
  sanskrit: string;
}

export interface ChapterMeta {
  chapterNumber: bigint;
  englishName: string;
  sanskritName: string;
  totalSlokas: bigint;
  summary: string;
}

export interface Sloka {
  chapterNumber: bigint;
  slokaNumber: bigint;
  sanskritText: string;
  transliteration: string;
  meanings: MultiLangText;
  explanation: string;
}

export interface PagedResult {
  items: Sloka[];
  page: bigint;
  pageSize: bigint;
  totalCount: bigint;
}

export function getTextForLanguage(
  text: MultiLangText,
  lang: Language,
): string {
  switch (lang) {
    case "en":
      return text.english;
    case "hi":
      return text.hindi;
    case "te":
      return text.telugu;
    case "sa":
      return text.sanskrit;
    default:
      return text.english;
  }
}

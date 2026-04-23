import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PagedResult {
    page: bigint;
    totalCount: bigint;
    pageSize: bigint;
    items: Array<Sloka>;
}
export interface MultiLangText {
    hindi: string;
    telugu: string;
    sanskrit: string;
    english: string;
}
export interface ChapterMeta {
    chapterNumber: bigint;
    sanskritName: string;
    totalSlokas: bigint;
    summary: string;
    englishName: string;
}
export interface Sloka {
    chapterNumber: bigint;
    meanings: MultiLangText;
    sanskritText: string;
    explanation: string;
    transliteration: string;
    slokaNumber: bigint;
}
export interface backendInterface {
    getChapter(chapterNumber: bigint): Promise<ChapterMeta | null>;
    getChapterSlokas(chapterNumber: bigint): Promise<Array<Sloka>>;
    getChapters(): Promise<Array<ChapterMeta>>;
    getDailySloka(): Promise<Sloka | null>;
    getSloka(chapterNumber: bigint, slokaNumber: bigint): Promise<Sloka | null>;
    searchSlokas(keyword: string, page: bigint, pageSize: bigint): Promise<PagedResult>;
}

import { createActor } from "@/backend";
import type { ChapterMeta, PagedResult, Sloka } from "@/types/gita";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useChapters() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChapterMeta[]>({
    queryKey: ["chapters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChapters() as Promise<ChapterMeta[]>;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useChapter(id: number | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChapterMeta | null>({
    queryKey: ["chapter", id],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getChapter(BigInt(id)) as Promise<ChapterMeta | null>;
    },
    enabled: !!actor && !isFetching && id !== undefined,
    staleTime: 1000 * 60 * 10,
  });
}

export function useSloka(
  chapter: number | undefined,
  number: number | undefined,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sloka | null>({
    queryKey: ["sloka", chapter, number],
    queryFn: async () => {
      if (!actor || chapter === undefined || number === undefined) return null;
      return actor.getSloka(
        BigInt(chapter),
        BigInt(number),
      ) as Promise<Sloka | null>;
    },
    enabled:
      !!actor && !isFetching && chapter !== undefined && number !== undefined,
    staleTime: 1000 * 60 * 10,
  });
}

export function useChapterSlokas(chapterId: number | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sloka[]>({
    queryKey: ["chapter-slokas", chapterId],
    queryFn: async () => {
      if (!actor || chapterId === undefined) return [];
      return actor.getChapterSlokas(BigInt(chapterId)) as Promise<Sloka[]>;
    },
    enabled: !!actor && !isFetching && chapterId !== undefined,
    staleTime: 1000 * 60 * 10,
  });
}

export function useSearchSlokas(keyword: string, page = 0, pageSize = 20) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PagedResult>({
    queryKey: ["search-slokas", keyword, page, pageSize],
    queryFn: async () => {
      if (!actor || !keyword.trim()) {
        return {
          items: [],
          page: BigInt(0),
          pageSize: BigInt(20),
          totalCount: BigInt(0),
        };
      }
      return actor.searchSlokas(
        keyword,
        BigInt(page),
        BigInt(pageSize),
      ) as Promise<PagedResult>;
    },
    enabled: !!actor && !isFetching && keyword.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDailySloka() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Sloka | null>({
    queryKey: ["daily-sloka"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDailySloka() as Promise<Sloka | null>;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60,
  });
}

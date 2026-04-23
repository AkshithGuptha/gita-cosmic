import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Types "../types/gita";
import GitaLib "../lib/gita";

mixin (
  slokas : Map.Map<(Nat, Nat), Types.Sloka>,
  chapters : List.List<Types.ChapterMeta>,
) {

  // ── Chapter queries ──────────────────────────────────────────────────────────

  /// Returns all 18 chapters with their metadata.
  public query func getChapters() : async [Types.ChapterMeta] {
    GitaLib.getAllChapters(chapters);
  };

  /// Returns metadata for a single chapter.
  public query func getChapter(chapterNumber : Nat) : async ?Types.ChapterMeta {
    GitaLib.getChapter(chapters, chapterNumber);
  };

  // ── Sloka queries ────────────────────────────────────────────────────────────

  /// Returns a specific sloka by chapter and sloka number.
  public query func getSloka(chapterNumber : Nat, slokaNumber : Nat) : async ?Types.Sloka {
    GitaLib.getSloka(slokas, chapterNumber, slokaNumber);
  };

  /// Returns all slokas for a given chapter.
  public query func getChapterSlokas(chapterNumber : Nat) : async [Types.Sloka] {
    GitaLib.getSlokasByChapter(slokas, chapterNumber);
  };

  /// Full-text keyword search across Sanskrit text and all language meanings.
  /// Returns a paged result.
  public query func searchSlokas(keyword : Text, page : Nat, pageSize : Nat) : async Types.PagedResult<Types.Sloka> {
    GitaLib.searchSlokas(slokas, keyword, { page; pageSize });
  };

  // ── Daily sloka ──────────────────────────────────────────────────────────────

  /// Returns today's sloka based on a date-derived index (day of year).
  public query func getDailySloka() : async ?Types.Sloka {
    let nowNs : Int = Time.now();
    // 86_400_000_000_000 nanoseconds per day
    let dayIndex : Nat = Int.abs(nowNs / 86_400_000_000_000);
    GitaLib.getDailySloka(slokas, dayIndex);
  };
};

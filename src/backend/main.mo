import List "mo:core/List";
import Map "mo:core/Map";
import Types "types/gita";
import GitaLib "lib/gita";
import GitaApi "mixins/gita-api";

actor {
  // Sloka store: key = (chapterNumber, slokaNumber)
  let slokas = Map.empty<(Nat, Nat), Types.Sloka>();

  // Chapter metadata list (ordered by chapter number)
  let chapters = List.empty<Types.ChapterMeta>();

  // Seed initial data on first run
  GitaLib.seedSlokas(slokas);
  GitaLib.seedChapters(chapters);

  // Include public API
  include GitaApi(slokas, chapters);
};

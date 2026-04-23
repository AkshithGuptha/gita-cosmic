import Common "common";

module {
  public type Timestamp = Common.Timestamp;
  public type Language = Common.Language;
  public type PageRequest = Common.PageRequest;
  public type PagedResult<T> = Common.PagedResult<T>;

  public type MultiLangText = {
    english : Text;
    hindi : Text;
    telugu : Text;
    sanskrit : Text;
  };

  public type Sloka = {
    chapterNumber : Nat;
    slokaNumber : Nat;
    sanskritText : Text;
    transliteration : Text;
    meanings : MultiLangText;
    explanation : Text;
  };

  public type SlokaKey = {
    chapterNumber : Nat;
    slokaNumber : Nat;
  };

  public type ChapterMeta = {
    chapterNumber : Nat;
    sanskritName : Text;
    englishName : Text;
    totalSlokas : Nat;
    summary : Text;
  };
};

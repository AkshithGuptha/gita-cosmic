module {
  public type Timestamp = Int;

  public type Language = {
    #english;
    #hindi;
    #telugu;
    #sanskrit;
  };

  public type PageRequest = {
    page : Nat;
    pageSize : Nat;
  };

  public type PagedResult<T> = {
    items : [T];
    totalCount : Nat;
    page : Nat;
    pageSize : Nat;
  };
};

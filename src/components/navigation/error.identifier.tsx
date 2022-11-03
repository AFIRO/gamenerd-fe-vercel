export class ErrorIdentifier{
  public static readonly REVIEW_NOT_FOUND = "No Review found";
  public static readonly NEWS_NOT_FOUND = "No News found";
  public static readonly NEWS_NOT_FOUND_GAME = "No news in database found for game";
  public static readonly REVIEWS_NOT_FOUND_GAME = "No reviews in database found for game";
  public static readonly NEWS_NOT_FOUND_WRITER = "No news in database found written by writer";
  public static readonly REVIEWS_NOT_FOUND_WRITER = "No reviews in database found written by writer";
  public static readonly NO_NEWS = "No news in database";
  public static readonly NO_REVIEWS = "No reviews in database";
  public static readonly NO_GAMES = "No games in database";
  public static readonly USER_ALREADY_EXISTS = "Error while creating: data already present in other user entity."
  public static readonly WRONG_CREDENTIALS = "The given user and password do not match."
  public static readonly NO_USER_FOUND = "No User found"
}


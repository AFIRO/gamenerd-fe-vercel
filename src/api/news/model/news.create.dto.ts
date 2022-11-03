export class NewsCreateDto {
  writerId: string;
  content: string;
  gameId: string;

  public constructor(base?: Partial<NewsCreateDto>) {
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}
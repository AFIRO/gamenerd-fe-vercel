export class ReviewCreateDto {
  score: number;
  content: string;
  writerId: string;
  gameId: string;

  public constructor(base?: Partial<ReviewCreateDto>) {
    this.score = base.score || this.score;
    this.content = base.content || this.content;
    this.writerId = base.writerId || this.writerId;
    this.gameId = base.gameId || this.gameId;
  }
}
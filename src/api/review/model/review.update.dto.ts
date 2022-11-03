export class ReviewUpdateDto {
  id: string;
  score: number;
  content: string;
  writerId: string;
  gameId: string;

  
  public constructor(base?: Partial<ReviewUpdateDto>) {
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writerId = base.writerId || this.writerId;
    this.content = base.content || this.content;
    this.gameId = base.gameId || this.gameId;
  }
}
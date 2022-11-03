import { Game } from "../../game/models/game.model";
import { UserShort } from "../../user/model/user.short";

export class Review {
  id: string;
  score: number;
  content: string;
  writer: UserShort;
  game: Game;

  public constructor(base?: Partial<Review>) {
    this.id = base.id || this.id;
    this.score = base.score || this.score;
    this.writer = base.writer || this.writer;
    this.content = base.content || this.content;
    this.game = base.game || this.game;
  }
}
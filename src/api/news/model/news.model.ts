import { Game } from "../../game/models/game.model";
import { UserShort } from "../../user/model/user.short";

export class News {
  id: string;
  content: string;
  writer: UserShort;
  game: Game;

  public constructor(base?: Partial<News>) {
    this.id = base.id || this.id;
    this.writer = base.writer || this.writer;
    this.content = base.content || this.content;
    this.game = base.game || this.game;
  }
}
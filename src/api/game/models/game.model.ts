export class Game {
  id: string;
  name: string;
  boxart: string;

  public constructor(base?: Partial<Game>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}
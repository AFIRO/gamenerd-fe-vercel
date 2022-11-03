export class GameCreateDto {
  name: string;
  boxart: string;

  public constructor(base?: Partial<GameCreateDto>) {
    this.name = base.name || this.name;
    this.boxart = base.boxart || this.boxart;
  }
}
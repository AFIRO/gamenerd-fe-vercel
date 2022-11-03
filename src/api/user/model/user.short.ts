export class UserShort {
  id: string;
  name: string;

  public constructor(base?: Partial<UserShort>) {
    this.id = base.id || this.id;
    this.name = base.name || this.name;
  }

}
export class UserPasswordUpdateDto {
  id: string;
  password: string

  public constructor(base?: Partial<UserPasswordUpdateDto>) {
    this.id = base.id || this.id;
    this.password = base.password || this.password;
  }
}
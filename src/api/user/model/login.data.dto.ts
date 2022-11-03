export class LoginDataDto{
  name: string;
  password: string;

  public constructor(base?: Partial<LoginDataDto>) {
    this.name = base.name || this.name;
    this.password = base.password || this.password;
}
}
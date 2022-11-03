export class UserCreateDto {
  name: string;
  roles: string[];
  password: string

  public constructor(base?: Partial<UserCreateDto>) {
      this.name = base.name || this.name;
      this.roles = base.roles || this.roles;
      this.password = base.password || this.password;
  }
}
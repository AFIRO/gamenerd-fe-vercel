import { User } from "./user.model";

export class UserWithToken {
  user: User;
  token: string;

  public constructor(base?: Partial<UserWithToken>) {
    this.user = base.user || this.user;
    this.token = base.token || this.token;
  }

}
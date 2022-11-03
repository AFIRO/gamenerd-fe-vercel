export class UserRegisterDto {
    name: string;
    password: string

    public constructor(base?: Partial<UserRegisterDto>) {
        this.name = base.name || this.name;
        this.password = base.password || this.password;
    }
}
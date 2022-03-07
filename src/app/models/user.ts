export class User {
  constructor(login?: string, password?: string, token?: any) {
    this.login = login;
    this.password= password;
    this.token = token;
  }

  login: string | null | undefined ;
  password?: string;
  token: string | null | undefined;
}

import { LoginModel } from "../login/login.model";

export class RegisterModel extends LoginModel {
    email: string;
    confirmPassword: string;
  
    constructor(username: string, password: string, email: string, confirmPassword: string) {
      super(username, password);
      this.email = email;
      this.confirmPassword = confirmPassword;
    }
  }
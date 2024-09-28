import type { User } from "./user.interface";

export interface Login {
  email: string;
  senha: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

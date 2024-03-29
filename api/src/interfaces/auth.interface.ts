export interface SignIn {
  email: string;
  senha: string;
}

export interface SignUp {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  perfilId: number;
}

export interface CreateUser {
  nome: string;
  email: string;
  senha: string;
  perfilId: number;
}

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  perfilId: number;
}

export interface NewPass {
  email: string;
  senha: string;
  token: string;
}

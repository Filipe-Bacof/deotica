export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  perfilId: number;
  resetSenhaExpiracao?: string;
  resetSenhaToken?: string;
}

export type SignIn = Pick<Usuario, "email" | "senha">;

export type CreateUser = SignIn & Pick<Usuario, "nome" | "perfilId">;

export type SignUp = CreateUser;

export type SignUpConfirmPass = SignUp & {
  confirmarSenha: string;
};

export type Forgot = Pick<Usuario, "email">;

export type NewPass = SignIn & {
  token: string;
};

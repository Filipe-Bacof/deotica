import { Usuario } from "../interfaces/auth.interface";

export function templatePrimeiroLogin(dataUsuario: Usuario) {
  return `
    <div>
      <h1>Você foi cadastrado na Deótica 🎉</h1>
      <p>
        Boas vindas ${dataUsuario.nome}!!!
      </p>
      <p>
        Clique no link abaixo para realizar o primeiro login e cadastrar sua
        senha de acesso:
      </p>
      <a href="${process.env.FRONTEND_HOST}/login">
        Clique para efetuar o seu login
      </a>
    </div>
`;
}

export function templateEsqueciMinhaSenha(token: string) {
  return `
    <div>
      <h1>😬 Ops, parece que você esqueceu sua senha...</h1>
      <p>
        Utilize o código abaixo para criar uma nova senha:
      </p>
      <p>
        ${token}
      </p>
    </div>
  `;
}

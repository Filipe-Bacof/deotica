"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateEsqueciMinhaSenha = exports.templatePrimeiroLogin = void 0;
function templatePrimeiroLogin(dataUsuario) {
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
exports.templatePrimeiroLogin = templatePrimeiroLogin;
function templateEsqueciMinhaSenha(token) {
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
exports.templateEsqueciMinhaSenha = templateEsqueciMinhaSenha;
//# sourceMappingURL=generateTemplates.js.map
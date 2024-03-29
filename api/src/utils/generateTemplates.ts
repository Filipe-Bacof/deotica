/*
  O Comentário abaixo da marcação estava no código da vidaia kkkk
  O primeiro acesso deve ser enviado como uma notificação apenas, já que não estamos
  armazenando no nosso backend se o email foi ou não confirmado.

  Claro que precisamos montar um html melhor para cada email
  deixei exatamente como estava na vidaia inclusive o CSS

  ------------------------------------------

  DETALHES IMPORTANTES:
  --> os serviços de email geralmente não reconhecem HTML semântico
    em outras palavras não adianta usar <header> - <section> - <footer> e demais tags
    utilize somente a tag <div>, é possível atribuir classes ou ids
    edit: nem a tag <body> kkk

  --> https://pt.stackoverflow.com/questions/273105/código-html-no-corpo-do-e-mail/

  --> a tag <meta> não funciona nem ferrando
    ou seja, não é possivel usar google fonts

  --> a tag <title> só aparece em guia de navegador
    então não tem a menor necessidade de colocar
  
  --> olha o que o link do stackoverflow diz sobre a tag <link>
    é preferivel evitar usar ela para referenciar CSS,
    porém dá pra estudar possíveis gambiarras com isso

  --> o principal comentário do link do stackoverflow:
    = <style> Alguns webmails como o Gmail por exemplo, removem esta tag
    pelo que eu notei o gmail não ignora ela totalmente, mas algumas propriedades
    como "justify-content" e "align-items" não pegam no gmail, no email da empresa foi...
    mas o "text-decoration" funcionou tranquilamente
    também é possível estilizar inline a principio... mas... gmail...

  --> Se liga na gambiarra que eu fiz para usar <svg> no footer
    edit: NO GMAIL NÃO FUNCIONA SVG
    vou ter que provavelmente usar imagens em algum dominio publico pra poder usar só no gmail

  --> Thiago disse na daily do dia 19/10/2023 que não é prioritária a correção do gmail agora
    portanto deixo o caminho das pedras para você aqui que for arrumar isso no futuro.
    caso for eu, salve Filipe do futuro
    "quando eu escrevi esse código, só eu e Deus sabiamos o que ele fazia, hoje só Deus"
*/

import { Usuario } from "../interfaces/auth.interface";
import {
  IconInstagram,
  IconLinkedin,
  IconWhatsApp,
  LogoVidaia,
} from "./svgForEmailTemplates";

export function templatePrimeiroLogin(dataUsuario: Usuario) {
  return `
  <html lang="pt-BR">
    <head>
      <style>
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          word-wrap: break-word;
        }
        .header {
          background-color: #9880f2;
        }
        .header svg {
          padding-left: 4rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
          width: 15rem;
        }
        .section {
          margin-left: 4rem;
          margin-right: 4rem;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        .text {
          padding-bottom: 2rem;
        }
        .line {
          border-top: 1px solid #4f4f4f;
        }
        .footer {
          background-color: #9880f2;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        .footer p {
          color: #ffffff;
        }
        p {
          color: #4f4f4f;
        }
        a, span, h1 {
          color: #9880f2;
        }
        a svg {
          padding: 0.5rem;
          width: 2.5rem;
          height: 2.5rem;
        }
        .underline {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${LogoVidaia()}
      </div>
      <div class="section">
        <h1 class="text">Você foi cadastrado na Deótica 🎉</h1>
        <p class="text">
          Boas vindas ${dataUsuario.nome}!!!
        </p>
        <p class="text">
          Clique no link abaixo para realizar o primeiro login e cadastrar sua
          senha de acesso:
        </p>
        <a class="underline" href="${process.env.FRONTEND_HOST}/login">
          ${process.env.FRONTEND_HOST}/login
        </a>
      </div>
      <div class="section line">
        <p>
          Precisa de ajuda? Envie um e-mail para
          <span class="underline">suporte@vidaia.com.br</span>
        </p>
      </div>
      <div class="footer">
        <p>Mantenha-se conectado</p>
        <a href="https://www.linkedin.com/company/vidaia-care/people/">
          ${IconLinkedin()}
        </a>
        <a href="https://www.instagram.com/vidaia.care/">
          ${IconInstagram()}
        </a>
        <a href="https://api.whatsapp.com/send?phone=5551999904158">
          ${IconWhatsApp()}
        </a>
      </div>
    </body>
  </html>
`;
}

export function templateEsqueciMinhaSenha(token: string, emailEncode: string) {
  return `
    <html lang="pt-BR">
      <head>
        <style>
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            word-wrap: break-word;
          }
          .header {
            background-color: #9880f2;
          }
          .header svg {
            padding-left: 4rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
            width: 15rem;
          }
          .section {
            margin-left: 4rem;
            margin-right: 4rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .text {
            padding-bottom: 2rem;
          }
          .line {
            border-top: 1px solid #4f4f4f;
          }
          .footer {
            background-color: #9880f2;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .footer p {
            color: #ffffff;
          }
          p {
            color: #4f4f4f;
          }
          a, span, h1 {
            color: #9880f2;
          }
          a svg {
            padding: 0.5rem;
            width: 2.5rem;
            height: 2.5rem;
          }
          .underline {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header">
          ${LogoVidaia()}
        </div>
        <div class="section">
          <h1 class="text">😬 Ops, parece que você esqueceu sua senha...</h1>
          <p class="text">
            Clique no link abaixo para redefini-la agora:
          </p>
          <a class="underline" href="${
            process.env.FRONTEND_HOST
          }/redefinePassword/${token}/${emailEncode}">
            ${
              process.env.FRONTEND_HOST
            }/redefinePassword/${token}/${emailEncode}
          </a>
        </div>
        <div class="section line">
          <p>
          Não foi você que pediu para redefinir a senha? Ignore esse e-mail ou entre em contato com nosso suporte:
            <span class="underline">suporte@vidaia.com.br</span>
          </p>
        </div>
        <div class="footer">
          <p>Mantenha-se conectado</p>
          <a href="https://www.linkedin.com/company/vidaia-care/people/">
            ${IconLinkedin()}
          </a>
          <a href="https://www.instagram.com/vidaia.care/">
            ${IconInstagram()}
          </a>
          <a href="https://api.whatsapp.com/send?phone=5551999904158">
            ${IconWhatsApp()}
          </a>
        </div>
      </body>
    </html>
  `;
}

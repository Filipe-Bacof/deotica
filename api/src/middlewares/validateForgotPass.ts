import { Request, Response, NextFunction } from "express";
import authRepository from "../repositories/auth.repository";
import bcrypt from "bcrypt";

const verifyTokenForgotPass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, senha, token } = req.body;

  if (!token)
    throw {
      status: 401,
      message: "O campo do Token não pode estar vazio",
    };
  if (!email)
    throw {
      status: 401,
      message: "O campo do e-mail não pode estar vazio.",
    };
  if (!senha)
    throw {
      status: 401,
      message: "O campo de senha não pode estar vazio",
    };

  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

  if (!regex.test(senha))
    throw {
      status: 401,
      message:
        "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula ou minúscula e um número.",
    };

  const foundUser = await authRepository.getByEmail(email);

  if (!foundUser)
    throw {
      status: 400,
      message: "Ocorreu um erro, tente novamente.",
    };

  if (!bcrypt.compareSync("vidaia123", foundUser.senha)) {
    if (foundUser.resetSenhaToken !== token)
      throw {
        status: 400,
        message: "O token informado está incorreto",
      };

    if (Number(foundUser.resetSenhaExpiracao) < Date.now())
      throw {
        status: 400,
        message: "O token informado expirou, tente gerar novamente.",
      };
  }

  next();
};

export default verifyTokenForgotPass;

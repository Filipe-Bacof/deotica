import bcrypt from "bcrypt";
import crypto from "crypto";
import authRepository from "../repositories/auth.repository";
import { generateToken } from "../utils/token";
import mailer from "../modules/mailer";
import type {
  SignIn,
  SignUp,
  SignUpConfirmPass,
} from "../interfaces/auth.interface";
import {
  templateEsqueciMinhaSenha,
  templatePrimeiroLogin,
} from "../utils/generateTemplates";
import profileRepository from "../repositories/profile.repository";
import { isUUID } from "../utils/validations";

async function signUp(data: SignUpConfirmPass) {
  const dataUsuario: SignUp = {
    nome: data.nome,
    email: data.email,
    senha: data.senha,
    perfilId: data.perfilId,
  };

  const checkEmailIsValid = await authRepository.getByEmail(data.email);
  console.log(data);
  if (checkEmailIsValid) {
    throw {
      status: 409,
      message: "Email já foi cadastrado.",
    };
  }

  const checkRoleIsValid = await profileRepository.getOne(data.perfilId);
  if (!checkRoleIsValid) {
    throw {
      status: 404,
      message: "Este perfil de usuário não existe.",
    };
  }

  const result = await authRepository.insert({
    ...dataUsuario,
    senha: bcrypt.hashSync(data.senha, 10),
  });

  mailer.sendMail(
    {
      to: data.email,
      from: `'Deotica' <${process.env.MAIL_USERNAME}>`,
      subject: "Deotica - Boas Vindas",
      html: templatePrimeiroLogin(dataUsuario),
    },
    (err, res) => {
      if (err) {
        console.log(err);
        throw {
          status: 400,
          message: `Não foi enviado o email de boas vindas. ${err}`,
        };
      }
      if (res) {
        console.log(res);
      }
    }
  );

  console.log(result);
}

async function signIn(data: SignIn) {
  const checkEmailIsValid = await authRepository.getByEmail(data.email);
  if (!checkEmailIsValid) {
    throw {
      status: 400,
      message: "Ocorreu um erro na autenticação.",
    };
  }
  if (!bcrypt.compareSync(data.senha, checkEmailIsValid.senha)) {
    throw {
      status: 400,
      message: "Ocorreu um erro na autenticação.",
    };
  }

  console.log(checkEmailIsValid);

  const token = generateToken(checkEmailIsValid.id);

  return { token: token };
}

async function forgot(email: string) {
  try {
    const foundUser = await authRepository.getByEmail(email);
    if (!foundUser) {
      throw {
        status: 400,
        message: "Ocorreu um erro, tente novamente.",
      };
    }

    const token = crypto.randomBytes(6).toString("hex");

    const now = new Date();

    const validade = `${now.setHours(now.getHours() + 1)}`;

    const result = await authRepository.updateTokenForgotPassword(
      email,
      token,
      validade
    );
    if (!result) {
      throw {
        status: 400,
        message: "Ocorreu um erro, tente novamente.",
      };
    }

    const resutMail = mailer.sendMail(
      {
        to: email,
        from: `'Deotica' <${process.env.MAIL_USERNAME}>`,
        subject: "Deotica - Token para resetar a senha",
        html: templateEsqueciMinhaSenha(token),
      },
      (err, res) => {
        if (err) {
          console.log(err);
          throw {
            status: 400,
            message: "Ocorreu um erro, tente novamente.",
          };
        }
        if (res) {
          console.log(res);
        }
      }
    );

    return resutMail;
  } catch (error) {
    console.log(error);
    throw {
      status: 400,
      message: "Ocorreu um erro, tente novamente.",
    };
  }
}

async function changePass(userId: string, senha: string) {
  try {
    const foundUser = await authRepository.getOneUser(userId);
    if (!foundUser) {
      throw {
        status: 400,
        message: "Ocorreu um erro, tente novamente.",
      };
    }

    const result = await authRepository.changePassword(
      userId,
      bcrypt.hashSync(senha, 10)
    );

    if (!result) {
      throw {
        status: 400,
        message: "Ocorreu um erro, tente novamente.",
      };
    }

    return result;
  } catch (error) {
    console.log(error);
    throw {
      status: 400,
      message: "Ocorreu um erro, tente novamente.",
    };
  }
}

async function newPass(email: string, senha: string) {
  const foundUser = await authRepository.getByEmail(email);

  if (!foundUser) {
    throw {
      status: 400,
      message: "Ocorreu um erro, tente novamente.",
    };
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(senha, saltRounds);

  const result = await authRepository.updatePassword(email, passwordHash);

  return result;
}

async function getUserData(id: string) {
  if (!isUUID(id)) {
    throw {
      status: 422,
      message: "Este ID não é válido!",
    };
  }

  const foundUser = await authRepository.getOneUser(id);

  if (!foundUser) {
    throw {
      status: 404,
      message: "Usuário não cadastrado!",
    };
  }

  return foundUser;
}

async function getUserDataByEmail(email: string) {
  const foundUser = await authRepository.getByEmail(email);

  if (!foundUser) {
    throw {
      status: 404,
      message: "Usuário não cadastrado!",
    };
  }

  return foundUser;
}

const authService = {
  signUp,
  signIn,
  forgot,
  newPass,
  changePass,
  getUserData,
  getUserDataByEmail,
};
export default authService;

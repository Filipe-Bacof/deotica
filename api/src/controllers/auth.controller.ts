import type { Request, Response } from "express";
import authService from "../services/auth.service";
import type { SignIn, SignUpConfirmPass } from "../interfaces/auth.interface";

export async function signUp(req: Request, res: Response) {
  const data: SignUpConfirmPass = req.body;
  const result = await authService.signUp(data);
  res.status(200).json({
    message: "Usuário criado com sucesso",
    data: result,
  });
}

export async function signIn(req: Request, res: Response) {
  const data: SignIn = req.body;

  const result = await authService.signIn(data);

  const user = await authService.getUserDataByEmail(data.email);

  res
    .status(200)
    .cookie("token", result.token, { httpOnly: true })
    .json({
      message: "Usuário logado com sucesso",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfilUsuario,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token: result.token,
    });
}

export async function forgot(req: Request, res: Response) {
  const { email } = req.body;
  console.log(email);
  const result = await authService.forgot(email);
  res.status(200).send({ result });
}

export async function newPass(req: Request, res: Response) {
  const { email, senha } = req.body;
  await authService.newPass(email, senha);
  res.status(200).send("Senha atualizada.");
}

export async function getUserData(req: Request, res: Response) {
  const { id } = req.params;
  const infoUser = await authService.getUserData(id);
  res.status(200).send(infoUser);
}

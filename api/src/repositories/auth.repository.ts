import { prisma } from "../config/database";
import type { CreateUser } from "../interfaces/auth.interface";

async function insert(data: CreateUser) {
  const result = await prisma.usuarios.create({ data });
  return result;
}

async function getAll() {
  const result = await prisma.usuarios.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
}

async function getByEmail(email: string) {
  const result = await prisma.usuarios.findUnique({
    where: {
      email,
    },
    include: { perfilUsuario: {} },
  });
  return result;
}

async function getOneUser(id: string) {
  const result = await prisma.usuarios.findUnique({
    where: { id },
    include: { perfilUsuario: {} },
  });
  return result;
}

async function updateTokenForgotPassword(
  email: string,
  token: string,
  validade: string
) {
  const result = await prisma.usuarios.update({
    where: { email },
    data: { resetSenhaToken: token, resetSenhaExpiracao: validade },
  });
  return result;
}

async function updatePassword(email: string, newPassword: string) {
  const result = await prisma.usuarios.update({
    where: {
      email,
    },
    data: {
      senha: newPassword,
    },
  });
  return result;
}

async function changePassword(userId: string, newPassword: string) {
  const result = await prisma.usuarios.update({
    where: {
      id: userId,
    },
    data: {
      senha: newPassword,
    },
  });
  return result;
}

const authRepository = {
  insert,
  getAll,
  getByEmail,
  getOneUser,
  updateTokenForgotPassword,
  updatePassword,
  changePassword,
};

export default authRepository;

import type {
  CriarPerfil,
  EditarPerfil,
} from "../interfaces/profile.interface";
import { prisma } from "../config/database";

async function insert(data: CriarPerfil) {
  console.log(data);
  return prisma.perfilUsuario.create({
    data: {
      nome: data.nome,
      permissoes: data.permissoes,
    },
  });
}

async function edit(id: number, data: EditarPerfil) {
  console.log(data);
  return prisma.perfilUsuario.update({
    where: { id },
    data: {
      nome: data.nome,
      permissoes: data.permissoes,
    },
  });
}

async function getAll(populateUser: boolean) {
  return prisma.perfilUsuario.findMany({
    include: { usuarios: populateUser },
  });
}

async function getOne(id: number) {
  const result = await prisma.perfilUsuario.findUnique({
    where: { id },
  });

  return result;
}

const profileRepository = {
  insert,
  edit,
  getAll,
  getOne,
};

export default profileRepository;

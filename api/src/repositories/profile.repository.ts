import { Perfil } from "../interfaces/profile.interface";
import { prisma } from "../config/database";

async function insert(data: Perfil) {
  console.log(data);
  return prisma.perfilUsuario.create({
    data,
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
  getAll,
  getOne,
};

export default profileRepository;

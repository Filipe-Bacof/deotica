import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const perfilUsuario = prisma.perfilUsuario.create({
  data: {
    id: 1,
    nome: "Administrador",
    permissoes: ["ADMIN"],
  },
});

const usuario1 = prisma.usuarios.create({
  data: {
    email: "filipebacof@gmail.com",
    nome: "Filipe Bacof",
    senha: bcrypt.hashSync("Deotica$Admin2024", 10),
    perfilId: 1,
  },
});

const usuario2 = prisma.usuarios.create({
  data: {
    email: "rafaelmahl@hotmail.com ",
    nome: "Rafael Mahl",
    senha: bcrypt.hashSync("Deotica$Admin2024", 10),
    perfilId: 1,
  },
});

async function run(): Promise<void> {
  // await prisma.perfilUsuario.deleteMany();
  // await prisma.usuarios.deleteMany();

  await Promise.all([perfilUsuario, usuario1, usuario2]);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

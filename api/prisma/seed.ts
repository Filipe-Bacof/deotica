import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const perfilUsuario = prisma.perfilUsuario.create({
  data: {
    id: 1,
    nome: "Administrador",
    permissoes: [
      "ADMIN",
      "CADASTRO_CLIENTE",
      "CADASTRO_PRODUTO",
      "EFETUAR_VENDA",
      "GERAR_ORDEM_SERVICO",
      "MANIPULAR_ESTOQUE",
      "GERENCIAR_LANDING_PAGE",
      "CRIAR_PERFIL_USUARIO",
      "CRIAR_USUARIO",
    ],
  },
});

const email = process.env.DEOTICA_EMAIL;
const nameUser = process.env.DEOTICA_NAME;
const password = process.env.DEOTICA_PASS;

const usuario1 = prisma.usuarios.create({
  data: {
    email: email || "",
    nome: nameUser || "",
    senha: bcrypt.hashSync(password || "", 10),
    perfilId: 1,
  },
});

async function run(): Promise<void> {
  await prisma.usuarios.deleteMany();
  await prisma.perfilUsuario.deleteMany();

  await perfilUsuario;
  await usuario1;
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

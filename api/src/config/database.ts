import pkg from "@prisma/client";

const { PrismaClient } = pkg;
console.log("🎲 Postgres database connected.");
export const prisma = new PrismaClient();

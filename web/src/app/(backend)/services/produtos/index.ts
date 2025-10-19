import prisma from "@/backend/services/db";
import { createProdutoSchema, updateProdutoSchema } from "../../schemas";
import { z } from "zod";


// --- CREATE ---
export async function createProduto(data: z.infer<typeof createProdutoSchema>) {
  const validatedData = createProdutoSchema.parse(data);
  const { nome, descricao, preco, categoriaIds } = validatedData;

  return await prisma.produtos.create({
    data: {
      nome,
      descricao,
      preco,
      categorias: {
        connect: categoriaIds.map((id) => ({ id })),
      },
    },
  });
}

// --- READ ---
export async function getAllProdutos() {
  return await prisma.produtos.findMany({
    include: {
      categorias: true,
    },
  });
}

export async function findProdutoById(id: string) {
  return await prisma.produtos.findUnique({
    where: { id },
    include: {
      categorias: true,
    },
  });
}

// --- UPDATE ---
export async function updateProduto(id: string, data: z.infer<typeof updateProdutoSchema>) {
  const validatedData = updateProdutoSchema.parse(data);
  const { nome, descricao, preco, categoriaIds } = validatedData;

  return await prisma.produtos.update({
    where: { id },
    data: {
      nome,
      descricao,
      preco,
      categorias: categoriaIds ? {
        set: categoriaIds.map((id) => ({ id })),
      } : undefined,
    },
  });
}

// --- DELETE ---
export async function deleteProduto(id: string) {
  return await prisma.produtos.delete({
    where: { id },
  });
}
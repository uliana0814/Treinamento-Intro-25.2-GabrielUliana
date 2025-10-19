import prisma from "@/backend/services/db";
import { createProdutoSchema, updateProdutoSchema } from "../../schemas";
import { z } from "zod";


export async function createProduto(data: z.infer<typeof createProdutoSchema>) {      //cria um novo produto no banco de dados
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

export async function getAllProdutos() {           //busca todos os produtos no banco de dados
  return await prisma.produtos.findMany({
    include: {
      categorias: true,
    },
  });
}

export async function findProdutoById(id: string) {        //busca um produto específico pelo id
  return await prisma.produtos.findUnique({
    where: { id },
    include: {
      categorias: true,
    },
  });
}

export async function updateProduto(id: string, data: z.infer<typeof updateProdutoSchema>) {    //atualiza um produto específico pelo id
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

export async function deleteProduto(id: string) {    //deleta um produto específico pelo id
  return await prisma.produtos.delete({
    where: { id },
  });
}
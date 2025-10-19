import prisma from "@/backend/services/db";
import { createCompraSchema } from "../../schemas";
import { z } from "zod";


/**
 * @param data ids dos produtos a serem comprados
 * @param userId id do usuário que tá fazendo a compra
 */
export async function createCompra(data: z.infer<typeof createCompraSchema>, userId: string) {  //cria uma nova compra no banco de dados

  const { produtoIds } = createCompraSchema.parse(data);

  const produtosNoBanco = await prisma.produtos.findMany({
    where: { id: { in: produtoIds } },
  });

  if (produtosNoBanco.length !== produtoIds.length) {      //garante que todos os produtos solicitados existem
    throw new Error("Um ou mais produtos não foram encontrados.");
  }

  const precoTotal = produtosNoBanco.reduce((total, produto) => total + produto.preco, 0);   //cálculo do preço total da compra

  return await prisma.compras.create({        //cria a compra no banco e associa ao usuário e aos produtos
    data: {
      precoTotal,
      user: { connect: { id: userId } },
      produtos: { connect: produtoIds.map((id) => ({ id })) },
    },
  });
}

/**
 * @param userId O ID do usuário para buscar o histórico de compras.
 */
export async function findComprasByUserId(userId: string) {   //busca as compras de um usuário específico
  return await prisma.compras.findMany({
    where: { userId },
    include: {
      produtos: true,
    },
  });
}


export async function findCompraById(id: string) {     //busca uma compra específica pelo id
    return await prisma.compras.findUnique({
        where: { id },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            },
            produtos: true,
        },
    });
}

export async function deleteCompra(id: string) {     //deleta uma compra pelo id
  return await prisma.compras.delete({
    where: { id },
  });
}
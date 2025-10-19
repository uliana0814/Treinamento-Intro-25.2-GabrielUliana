import prisma from "@/backend/services/db";
import { createCompraSchema } from "../../schemas";
import { z } from "zod";


/**
 * Cria uma nova compra no banco de dados de forma segura.
 * @param data Contém os IDs dos produtos a serem comprados.
 * @param userId O ID do usuário autenticado que está fazendo a compra.
 */
export async function createCompra(data: z.infer<typeof createCompraSchema>, userId: string) {
  const { produtoIds } = createCompraSchema.parse(data);

  // Busca os preços reais dos produtos no banco para evitar manipulação.
  const produtosNoBanco = await prisma.produtos.findMany({
    where: { id: { in: produtoIds } },
  });

  // Garante que todos os produtos solicitados existem.
  if (produtosNoBanco.length !== produtoIds.length) {
    throw new Error("Um ou mais produtos não foram encontrados.");
  }

  // Calcula o preço total no backend para segurança.
  const precoTotal = produtosNoBanco.reduce((total, produto) => total + produto.preco, 0);

  // Cria a compra no banco, associando ao usuário e aos produtos.
  return await prisma.compras.create({
    data: {
      precoTotal,
      user: { connect: { id: userId } },
      produtos: { connect: produtoIds.map((id) => ({ id })) },
    },
  });
}

// --- READ ---
/**
 * Busca todas as compras de um usuário específico.
 * @param userId O ID do usuário para buscar o histórico de compras.
 */
export async function findComprasByUserId(userId: string) {
  return await prisma.compras.findMany({
    where: { userId },
    include: {
      produtos: true,
    },
  });
}

/**
 * Busca uma compra única pelo seu ID.
 */
export async function findCompraById(id: string) {
    return await prisma.compras.findUnique({
        where: { id },
        include: {
            user: {
                select: { id: true, name: true, email: true } // Evita expor dados sensíveis
            },
            produtos: true,
        },
    });
}

// --- DELETE ---
/**
 * Deleta uma compra pelo seu ID.
 */
export async function deleteCompra(id: string) {
  return await prisma.compras.delete({
    where: { id },
  });
}
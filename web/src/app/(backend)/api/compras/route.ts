import prisma from "@/backend/services/db";

/**
 * Cria uma nova compra para um usuário com base nos IDs dos produtos.
 * @param data - Dados contendo os IDs dos produtos.
 * @param userId - ID do usuário que está realizando a compra.
 */
export async function criarCompra(data: { produtoIds: string[] }, userId: string) {
  const { produtoIds } = data;

  // Verifica se todos os produtos existem
  const produtosEncontrados = await prisma.produtos.findMany({
    where: {
      id: {
        in: produtoIds,
      },
    },
  });

  if (produtosEncontrados.length !== produtoIds.length) {
    throw new Error("Um ou mais produtos não foram encontrados.");
  }

  const precoTotal = produtosEncontrados.reduce(
    (total, produto) => total + produto.preco,
    0
  );

  // Criação da compra e associação com os produtos
  const novaCompra = await prisma.compras.create({
    data: {
      userId,
      precoTotal,
      produtos: {
        create: produtosEncontrados.map((produto) => ({
          produto: {
            connect: { id: produto.id },
          },
          precoUnitario: produto.preco,
          quantidade: 1, // ou ajuste conforme necessário
        })),
      },
    },
  });

  return novaCompra;
}

/**
 * Busca todas as compras feitas por um usuário específico.
 * @param userId - ID do usuário.
 */
export async function buscarComprasPorUsuario(userId: string) {
  return await prisma.compras.findMany({
    where: { userId },
    include: {
      produtos: {
        include: {
          produto: true,
        },
      },
    },
  });
}

/**
 * Busca uma compra específica pelo ID.
 * @param id - ID da compra.
 */
export async function buscarCompraPorId(id: string) {
  return await prisma.compras.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      produtos: {
        include: {
          produto: true,
        },
      },
    },
  });
}

/**
 * Remove uma compra do banco de dados.
 * @param id - ID da compra.
 */
export async function removerCompra(id: string) {
  return await prisma.compras.delete({
    where: { id },
  });
}

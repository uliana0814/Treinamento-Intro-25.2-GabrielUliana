import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface DadosNovaCompra {
  
  userId: string;
  produtosIds: string[];
}

export const servicoCompra = {

  async listarPorUsuario(idUsuario: string) {
    try {
      const listaCompras = await prisma.compra.findMany({
        where: { userId: idUsuario },
        include: {
          produtos: {
            include: {
              produto: true,
            },
          },
        },
      });

      return listaCompras;
    } catch (erro) {
      console.error(`Erro ao buscar compras do usuário ${idUsuario}:`, erro);
      throw new Error("Erro ao recuperar as compras do usuário.");
    }
  },

  async registrarCompra(dados: DadosNovaCompra) {
    const { userId, produtosIds } = dados;

    try {
      const produtosSelecionados = await prisma.produto.findMany({
        where: {
          id: { in: produtosIds },
        },
      });

      const valorTotal = produtosSelecionados.reduce((soma, item) => soma + item.preco, 0);

      const novaCompraRegistrada = await prisma.$transaction(async (db) => {
        const compraCriada = await db.compra.create({
          data: {
            userId,
            precoTotal: valorTotal,
          },
        });

        const itensDaCompra: Prisma.CompraProdutoCreateManyInput[] = produtosSelecionados.map((produto) => ({
            compraId: compraCriada.id,
            produtoId: produto.id,
            precoUnitario: produto.preco,
          }));


        await db.compraProduto.createMany({
          data: itensDaCompra,
        });

        return compraCriada;
      });

      return novaCompraRegistrada;

    } catch (erro) {
      console.error("Erro ao processar nova compra:", erro);
      throw new Error("Não foi possível concluir a compra.");
    }
  },
};
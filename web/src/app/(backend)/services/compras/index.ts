import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface CartItem {
  product: {
    id: string;
    price: number;
  };
  quantity: number;
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

  async registrarCompra(cartItems: CartItem[], userId: string) {
    
    const valorTotal = cartItems.reduce((soma, item) => {
      return soma + (item.product.price * item.quantity);
    }, 0);

    try {
      const novaCompraRegistrada = await prisma.$transaction(async (db) => {
        const compraCriada = await db.compra.create({
          data: {
            userId,
            precoTotal: valorTotal,
          },
        });

        const itensDaCompra: Prisma.CompraProdutoCreateManyInput[] = cartItems.map((item) => ({
          compraId: compraCriada.id,
          produtoId: item.product.id,
          precoUnitario: item.product.price,
          quantidade: item.quantity, 
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
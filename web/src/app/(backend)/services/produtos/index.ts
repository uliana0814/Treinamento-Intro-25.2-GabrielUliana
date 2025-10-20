import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type DadosProduto = Omit<Prisma.ProdutoUncheckedCreateInput, "id">;

export const servicoProduto = {

  async listarTodos() {
    try {
      const lista = await prisma.produto.findMany();
      return lista;
    } catch (erro) {
      console.error("Falha ao listar os produtos:", erro);
      throw new Error("Erro ao recuperar a lista de produtos.");
    }
  },

  async buscarPorId(produtoId: string) {
    try {
      const resultado = await prisma.produto.findUnique({
        where: { id: produtoId },
      });
      return resultado;
    } catch (erro) {
      console.error(`Erro ao encontrar produto com ID ${produtoId}:`, erro);
      throw new Error("Erro ao buscar o produto.");
    }
  },

  async cadastrar(dados: DadosProduto) {
    try {
      const criado = await prisma.produto.create({
        data: dados,
      });
      return criado;
    } catch (erro) {
      console.error("Problema ao criar novo produto:", erro);
      throw new Error("Falha ao registrar o produto.");
    }
  },

  async editar(produtoId: string, atualizacoes: Partial<DadosProduto>) {
    try {
      const atualizado = await prisma.produto.update({
        where: { id: produtoId },
        data: atualizacoes,
      });
      return atualizado;
    } catch (erro) {
      console.error(`Erro ao atualizar produto ${produtoId}:`, erro);
      throw new Error("Não foi possível modificar o produto.");
    }
  },

  async remover(produtoId: string) {
    try {
      await prisma.produto.delete({
        where: { id: produtoId },
      });
      return { mensagem: "Produto removido com sucesso." };
    } catch (erro) {
      console.error(`Erro ao remover produto ${produtoId}:`, erro);
      throw new Error("Erro ao deletar o produto.");
    }
  },
};

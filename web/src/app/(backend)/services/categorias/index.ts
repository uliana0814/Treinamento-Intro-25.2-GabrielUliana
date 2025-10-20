import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const categoriaService = {
  async listarTodas() {
    try {
      const listaCategorias = await prisma.categoria.findMany();
      return listaCategorias;
    } catch (err) {
      console.error("Falha ao obter categorias:", err);
      throw new Error("Erro ao buscar as categorias.");
    }
  },

  async buscarPorId(categoriaId: string) {
    try {
      const categoriaEncontrada = await prisma.categoria.findUnique({
        where: { id: categoriaId },
      });
      return categoriaEncontrada;
    } catch (err) {
      console.error(`Falha ao buscar categoria pelo ID ${categoriaId}:`, err);
      throw new Error("Erro ao buscar a categoria.");
    }
  },

  async criarCategoria(nomeCategoria: string) {
    try {
      const categoriaCriada = await prisma.categoria.create({
        data: { nome: nomeCategoria },
      });
      return categoriaCriada;
    } catch (err) {
      console.error("Erro ao cadastrar nova categoria:", err);
      throw new Error("Não foi possível criar a categoria.");
    }
  },

  async editarCategoria(categoriaId: string, novoNome: string) {
    try {
      const categoriaAtualizada = await prisma.categoria.update({
        where: { id: categoriaId },
        data: { nome: novoNome },
      });
      return categoriaAtualizada;
    } catch (err) {
      console.error(`Erro ao atualizar categoria ${categoriaId}:`, err);
      throw new Error("Erro ao atualizar a categoria.");
    }
  },

  async removerCategoria(categoriaId: string) {
    try {
      await prisma.categoria.delete({
        where: { id: categoriaId },
      });
      return { mensagem: "Categoria removida com sucesso." };
    } catch (err) {
      console.error(`Erro ao deletar categoria ${categoriaId}:`, err);
      throw new Error("Não foi possível deletar a categoria.");
    }
  },
};

import { z } from 'zod';

export const categoriaSchema = z.object({     //schema para validar a criação e atualização de uma categoria
  nome: z.string().min(2, { message: "O nome da categoria deve ter no mínimo 2 caracteres." }),
});

export const updateCategoriaSchema = categoriaSchema.partial();

export const createProdutoSchema = z.object({   //schema para validar a criação de um produto

  nome: z.string().min(2, { message: "O nome do produto é obrigatório." }),
  descricao: z.string().min(2, { message: "A descrição é obrigatória." }),
  preco: z.number().positive({ message: "O preço deve ser um número positivo." }),
  categoriaIds: z.array(z.string()).nonempty({ message: "É necessário selecionar pelo menos uma categoria." }),
});

export const updateProdutoSchema = createProdutoSchema.partial();

export const createCompraSchema = z.object({   //schema para validar a criação de uma compra

  produtoIds: z.array(z.string()).nonempty({ message: "A compra deve conter pelo menos um produto." }),
});
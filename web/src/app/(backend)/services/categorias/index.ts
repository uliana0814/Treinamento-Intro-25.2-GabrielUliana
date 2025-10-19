import prisma from "@/backend/services/db";
import { categoriaSchema, updateCategoriaSchema } from "../../schemas";
import { z } from "zod";


export async function createCategoria(data: z.infer<typeof categoriaSchema>) {     //cria uma nova categoria no banco de dados
  const validatedData = categoriaSchema.parse(data);
  return await prisma.categorias.create({
    data: validatedData,
  });
}

export async function getAllCategorias() {       //busca todas as categorias no banco de dados
  return await prisma.categorias.findMany();
}

export async function findCategoriaById(id: string) {   //busca uma categoria específica pelo id
  return await prisma.categorias.findUnique({
    where: { id },
  });
}

export async function updateCategoria(id: string, data: z.infer<typeof updateCategoriaSchema>) {   //atualiza uma categoria específica pelo id
  const validatedData = updateCategoriaSchema.parse(data);
  return await prisma.categorias.update({
    where: { id },
    data: validatedData,
  });
}

export async function deleteCategoria(id: string) {    //deleta uma categoria específica pelo id
  return await prisma.categorias.delete({
    where: { id },
  });
}
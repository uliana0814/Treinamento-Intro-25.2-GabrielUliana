import prisma from "@/backend/services/db";
import { categoriaSchema, updateCategoriaSchema } from "../../schemas";
import { z } from "zod";


// --- CREATE ---
export async function createCategoria(data: z.infer<typeof categoriaSchema>) {
  const validatedData = categoriaSchema.parse(data);
  return await prisma.categorias.create({
    data: validatedData,
  });
}

// --- READ ---
export async function getAllCategorias() {
  return await prisma.categorias.findMany();
}

export async function findCategoriaById(id: string) {
  return await prisma.categorias.findUnique({
    where: { id },
  });
}

// --- UPDATE ---
export async function updateCategoria(id: string, data: z.infer<typeof updateCategoriaSchema>) {
  const validatedData = updateCategoriaSchema.parse(data);
  return await prisma.categorias.update({
    where: { id },
    data: validatedData,
  });
}

// --- DELETE ---
export async function deleteCategoria(id: string) {
  return await prisma.categorias.delete({
    where: { id },
  });
}
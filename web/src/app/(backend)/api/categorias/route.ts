import { NextResponse } from 'next/server';
import * as CategoriaService from '@/backend/services/categorias/index';
import { categoriaSchema } from '@/backend/schemas';
import { ZodError } from 'zod';

export async function GET() {         //função para listar todas as categorias
  try {
    const categorias = await CategoriaService.getAllCategorias();
    return NextResponse.json(categorias, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar categorias.' }, { status: 500 });
  }
}

export async function POST(request: Request) {        //função para criar uma nova categoria
  try {
    const body = await request.json();
    categoriaSchema.parse(body);

    const novaCategoria = await CategoriaService.createCategoria(body);
    return NextResponse.json(novaCategoria, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar categoria.' }, { status: 500 });
  }
}
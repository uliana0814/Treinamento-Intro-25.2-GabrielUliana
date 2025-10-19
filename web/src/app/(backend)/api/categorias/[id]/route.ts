import { NextResponse } from 'next/server';
import * as CategoriaService from '@/backend/services/categorias/index';
import { updateCategoriaSchema } from '@/backend/schemas';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {     //função para buscar uma categoria específica pelo id
  try {
    const { id } = params;
    const categoria = await CategoriaService.findCategoriaById(id);

    if (!categoria) {
      return NextResponse.json({ message: 'Categoria não encontrada.' }, { status: 404 });
    }

    return NextResponse.json(categoria, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar categoria.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {       //função para atualizar uma categoria específica pelo id
  try {
    const { id } = params;
    const body = await request.json();

    updateCategoriaSchema.parse(body);

    const categoriaAtualizada = await CategoriaService.updateCategoria(id, body);
    return NextResponse.json(categoriaAtualizada, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Categoria não encontrada para atualização.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao atualizar categoria.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {        //função para deletar uma categoria específica pelo id
  try {
    const { id } = params;
    await CategoriaService.deleteCategoria(id);

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Categoria não encontrada para exclusão.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao deletar categoria.' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { categoriaService } from '@/backend/services/categorias';
import { Prisma } from '@prisma/client';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const categoria = await categoriaService.buscarPorId(id);

    if (!categoria) {
      return NextResponse.json({ message: 'Categoria não encontrada.' }, { status: 404 });
    }

    return NextResponse.json(categoria, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar categoria.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!body || typeof body.nome !== 'string' || body.nome.trim() === '') {
      return NextResponse.json({ message: 'Nome inválido ou ausente.' }, { status: 400 });
    }

    const categoriaAtualizada = await categoriaService.editarCategoria(id, body.nome.trim());

    return NextResponse.json(categoriaAtualizada, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Categoria não encontrada para atualização.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao atualizar categoria.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    await categoriaService.removerCategoria(id);

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Categoria não encontrada para exclusão.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao deletar categoria.' }, { status: 500 });
  }
}

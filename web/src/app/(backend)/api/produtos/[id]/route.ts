import { NextResponse } from 'next/server';
import { servicoProduto } from '@/backend/services/produtos';
import { Prisma } from '@prisma/client';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const produto = await servicoProduto.buscarPorId(id);

    if (!produto) {
      return NextResponse.json({ message: 'Produto não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json({ message: 'Erro ao buscar produto.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();

    const produtoAtualizado = await servicoProduto.editar(id, body);
    return NextResponse.json(produtoAtualizado, { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Produto não encontrado para atualização.' },
        { status: 404 }
      );
    }

    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json({ message: 'Erro ao atualizar produto.' }, { status: 500 });
  }
}

// Deletar um produto pelo ID
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    await servicoProduto.remover(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { message: 'Produto não encontrado para exclusão.' },
        { status: 404 }
      );
    }

    console.error('Erro ao deletar produto:', error);
    return NextResponse.json({ message: 'Erro ao deletar produto.' }, { status: 500 });
  }
}

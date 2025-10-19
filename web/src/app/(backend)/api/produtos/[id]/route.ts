import { NextResponse } from 'next/server';
import * as ProdutoService from '@/backend/services/produtos/index';
import { updateProdutoSchema } from '@/backend/schemas';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {         //função para buscar um produto específico pelo id
  try {
    const { id } = params;
    const produto = await ProdutoService.findProdutoById(id);

    if (!produto) {
      return NextResponse.json({ message: 'Produto não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar produto.' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {       //função para atualizar um produto específico pelo id
  try {
    const { id } = params;
    const body = await request.json();

    updateProdutoSchema.parse(body);

    const produtoAtualizado = await ProdutoService.updateProduto(id, body);
    return NextResponse.json(produtoAtualizado, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Produto não encontrado para atualização.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao atualizar produto.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {       //função para deletar um produto específico pelo id
  try {
    const { id } = params;
    await ProdutoService.deleteProduto(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Produto não encontrado para exclusão.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao deletar produto.' }, { status: 500 });
  }
}
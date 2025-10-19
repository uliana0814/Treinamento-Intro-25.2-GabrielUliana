import { NextResponse } from 'next/server';
import * as ProdutoService from '@/backend/services/produtos/index';
import { createProdutoSchema } from '@/backend/schemas';
import { ZodError } from 'zod';

export async function GET() {        //função para buscar todos os produtos
  try {
    const produtos = await ProdutoService.getAllProdutos();
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar produtos.' }, { status: 500 });
  }
}

export async function POST(request: Request) {           //função para criar um novo produto
  try {
    const body = await request.json();
    createProdutoSchema.parse(body);

    const novoProduto = await ProdutoService.createProduto(body);
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar produto.' }, { status: 500 });
  }
}
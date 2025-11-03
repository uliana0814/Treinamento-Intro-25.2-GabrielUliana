import { NextResponse } from 'next/server';
import { servicoProduto } from '@/backend/services/produtos';
import { ZodError } from 'zod';
import { createProdutoSchema } from '@/backend/schemas';

export async function GET() {
  try {
    const produtos = await servicoProduto.listarTodos();
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ message: 'Erro ao buscar produtos.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    createProdutoSchema.parse(body); 

    const novoProduto = await servicoProduto.cadastrar(body);
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ message: 'Erro ao criar produto.' }, { status: 500 });
  }
}

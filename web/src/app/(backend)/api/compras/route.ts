import { NextResponse } from 'next/server';
import * as CompraService from '@/backend/services/compras/index';
import { createCompraSchema } from '@/backend/schemas';
import { ZodError } from 'zod';

export async function GET() {         //função para listar todas as compras

  try {
    const compras = await CompraService.getAllCompras();
    return NextResponse.json(compras, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar compras.' }, { status: 500 });
  }
}

export async function POST(request: Request) {          //função para criar uma nova compra
  try {
    const userId = 'placeholder-do-id-do-usuario-logado';
    if (!userId) {
      return NextResponse.json({ message: 'Usuário não autenticado.' }, { status: 401 });
    }

    const body = await request.json();
    createCompraSchema.parse(body);

    const novaCompra = await CompraService.createCompra(body, userId);
    return NextResponse.json(novaCompra, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar compra.' }, { status: 500 });
  }
}
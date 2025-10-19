import { NextResponse } from 'next/server';
import * as CompraService from '@/app/(backend)/services/compra.service';
import { PrismaClientKnownRequestError } from '@prisma/client';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteParams) {       //função para ler uma compra específica

  try {
    const { id } = params;
    const compra = await CompraService.findCompraById(id);

    if (!compra) {
      return NextResponse.json({ message: 'Compra não encontrada.' }, { status: 404 });
    }

    return NextResponse.json(compra, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar compra.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {      //função para deletar uma compra
  try {
    const { id } = params;
    await CompraService.deleteCompra(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Compra não encontrada para exclusão.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao deletar compra.' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { ServicoCompra } from '@/backend/services/compras';
import { PrismaClientKnownRequestError } from '@prisma/client';

type RouteParams = {
  params: {
    id: string; 
  };
};

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    const compras = await ServicoCompra.listarPorUsuario(id);

    if (!compras || compras.length === 0) {
      return NextResponse.json({ message: 'Nenhuma compra encontrada para este usuário.' }, { status: 404 });
    }

    return NextResponse.json(compras, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar compras do usuário.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    await ServicoCompra.removerCompra(id);

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ message: 'Compra não encontrada para exclusão.' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ message: 'Erro ao deletar compra.' }, { status: 500 });
  }
}

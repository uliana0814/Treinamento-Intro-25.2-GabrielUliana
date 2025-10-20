import { NextResponse } from 'next/server';
import { categoriaService } from '@/backend/services/categorias';

export async function GET() {
  try {
    const categorias = await categoriaService.listarTodas();
    return NextResponse.json(categorias, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar categorias.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validação simples manual
    if (!body || typeof body.nome !== 'string' || body.nome.trim() === '') {
      return NextResponse.json({ message: 'Nome inválido ou ausente.' }, { status: 400 });
    }

    const novaCategoria = await categoriaService.criarCategoria(body.nome.trim());

    return NextResponse.json(novaCategoria, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar categoria.' }, { status: 500 });
  }
}

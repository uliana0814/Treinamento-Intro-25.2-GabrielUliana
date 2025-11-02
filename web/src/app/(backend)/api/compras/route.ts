import { NextResponse } from 'next/server';
import { servicoCompra } from '@/backend/services/compras'; 

type CartItem = {
  product: {
    id: string; 
    price: number;
  };
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const cartItems: CartItem[] = await request.json();

    
    const userId = "USER_ID_DE_TESTE"; 

    const novaCompra = await servicoCompra.registrarCompra(cartItems, userId);

    return NextResponse.json(novaCompra, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar compra:", error);
    return NextResponse.json({ message: error.message || "Erro interno ao processar compra" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const userId = "USER_ID_DE_TESTE"; 

    const compras = await servicoCompra.listarPorUsuario(userId);
    return NextResponse.json(compras, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    return NextResponse.json({ message: error.message || "Erro interno" }, { status: 500 });
  }
}
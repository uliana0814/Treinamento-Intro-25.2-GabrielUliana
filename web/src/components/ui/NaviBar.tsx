// 1. ADICIONADO: Necessário para usar localStorage, useState e useEffect
'use client'; 

import { ShoppingCart, CircleUserRound } from "lucide-react";
import { useState, useEffect } from "react"; // 2. IMPORTADO
import Link from "next/link"; // 3. IMPORTADO

interface NaviBarProps {
  cartCount: number;
  totalPrice: number;
  onCartClick: () => void;
}

export default function NaviBar({ cartCount, totalPrice, onCartClick }: NaviBarProps) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []); 

  return (
    <header>
      <nav className="flex h-30 w-full items-center justify-between bg-white px-10">
        <div className="flex items-center gap-4">
          <img src="/imgs/logo.png" alt="Logo 027 store" className="h-24" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-6xl font-sans font-bold text-blue-900">
            027 STORE!
          </h1>
        </div>


        <div className="flex items-center gap-10">

          {userName ? (
            <div className="flex items-center gap-2 font-sans text-lg">
              <CircleUserRound className="text-black h-8 w-8" />
              <h4>Olá, {userName}</h4>
              <Link href="/logout" className="text-sm text-red-600 hover:underline">
                (Sair)
              </Link>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-4 font-sans text-lg cursor-pointer">
              <CircleUserRound className="text-black h-8 w-8" />
              <h4>Entrar / Cadastrar</h4>
            </Link>
          )}

          <button
            onClick={onCartClick}
            className="flex items-center gap-4 font-sans text-lg cursor-pointer"
          >
            <ShoppingCart className="text-black h-8 w-8" />
            <h4>
              Carrinho ({cartCount})
            </h4>
            <h4 className="font-bold">
              {totalPrice.toFixed(2)}
            </h4>
          </button>
        </div>
      </nav>

      <div className="p-5 text-center font-sans text-3xl font-bold">
        <p> A melhor loja de produtos e experiências capixabas! </p>
      </div>
    </header>
  );
}
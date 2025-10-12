"use client"; 
import React, { useState } from 'react';
import ProdutoCard from '@/components/ui/ProdutoCard';
import NaviBar from '@/components/ui/NaviBar';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

const productsData: Product [] = [
  {       
    id: 1,
    name: "Quebradeira capixaba",
    image: "/imgs/gaudio_mathias.png", 
    description: "Contrate dois dançarinos profissionais!",
    price: 599.90,
  },
  {
    id: 2,
    name: "Bananinha Reggiani (importada)",
    image: "/imgs/bananinha.jpg", 
    description: "A cachaça mais famosa do Brasil!",
    price: 79.90,
  },
  {
    id: 3,
    name: "Show de funk (DJ KN de VV)",
    image: "/imgs/show.jpg", 
    description: "Show do melhor funk do Brasil, diretamente do ES!",
    price: 399.90,
  },
  {
    id: 4,
    name: "Moqueca capixaba",
    image: "/imgs/moqueca.avif", 
    description: "A única moqueca de verdade!",
    price: 129.90
  },
  {
    id: 5,
    name: "Ingresso Rio Branco X Desportiva",
    image: "/imgs/rio-branco-x-desportiva.png", 
    description: "Maior clássico do futebol capixaba, jogo raiz de verdade!",
    price: 9.90
  },
  {
   id: 6,
  name: "Chinelo havaianas branco",
  image: "/imgs/havaianas.webp", 
  description: "Calçado oficial dos capixabas!",
  price: 29.90 
  }
]

export default function HomePage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
    const handleAddToCart = (productToAdd: Product) => {
    setCartItems(prevItems => [...prevItems, productToAdd]);
  };

  const handleRemoveFromCart = (productIdToRemove: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productIdToRemove));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
    <NaviBar cartCount={cartItems.length} totalPrice={totalPrice} />
    <div className="grid grid-cols-1 gap-10 p-20 md:grid-cols-2 lg:grid-cols-3">
      {productsData.map(product => (
        <ProdutoCard
          key={product.id}
          product={product}
          onAddToCart={() => handleAddToCart(product)}
          onRemoveFromCart={() => handleRemoveFromCart(product.id)}
        />
      ))} 
      </div>
    </>
  );
}
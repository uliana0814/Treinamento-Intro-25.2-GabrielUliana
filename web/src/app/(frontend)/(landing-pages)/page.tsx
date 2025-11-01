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
  const [isCartOpen, setIsCartOpen] = useState(false);
    const handleAddToCart = (productToAdd: Product) => {
    setCartItems(prevItems => [...prevItems, productToAdd]);
  };

  const handleRemoveFromCart = (productIdToRemove: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === productIdToRemove);
      if (itemIndex === -1) {
        return prevItems;
      }
      const newItems = [...prevItems];
      newItems.splice(itemIndex, 1);
      return newItems;
    });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
    <NaviBar cartCount={cartItems.length}
    totalPrice={totalPrice}
    onCartClick={() => setIsCartOpen(true)}
    />
    {isCartOpen && (
        <div className="absolute top-24 left-4 right-4 z-50 rounded-lg bg-white p-6 shadow-xl border md:w-full md:max-w-md md:left-auto md:right-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Seu Carrinho</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
            </div>
            <div className="space-y-4">
              {cartItems.length > 0 ? cartItems.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-2">
                  <span>{item.name}</span>
                  <span>{item.price.toFixed(2)}</span>
                </div>
                ))
               :
                <p>Seu carrinho está vazio.</p>
              }
            </div>
             <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">
              {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
      )}
    <div className="grid grid-cols-1 gap-10 p-4 md:p-10 lg:p-20 md:grid-cols-2 lg:grid-cols-3">
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
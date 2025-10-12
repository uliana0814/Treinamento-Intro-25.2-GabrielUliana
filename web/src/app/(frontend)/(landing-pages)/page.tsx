"use client"; 
import React, { useState } from 'react';
import ProdutoCard from '@/components/ui/ProdutoCard';

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);
    const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const handleRemoveFromCart = () => {
    setCartCount(prevCount => {
      if (prevCount > 0) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      <ProdutoCard 
         product={{
           name: "Quebradeira capixaba",
           image: "/imgs/gaudio_mathias.png", 
           description: "Contrate dois dançarinos profissionais!",
           price: "R$599,90 por hora"
         }}
         onAddToCart={handleAddToCart}
         onRemoveFromCart={handleRemoveFromCart}
       />
       <ProdutoCard 
         product={{
           name: "Bananinha Reggiani (importada)",
           image: "/imgs/bananinha.jpg", 
           description: "A cachaça mais famosa do Brasil!",
           price: "R$79,90"
         }}
         onAddToCart={handleAddToCart}
         onRemoveFromCart={handleRemoveFromCart}
       />
       <ProdutoCard 
         product={{
           name: "Show de funk (DJ KN de VV)",
           image: "/imgs/show.jpg", 
           description: "Show de funk diretamente do ES!",
           price: "R$399,90"
         }}
         onAddToCart={handleAddToCart}
         onRemoveFromCart={handleRemoveFromCart}
       />
      </div>
  );
}
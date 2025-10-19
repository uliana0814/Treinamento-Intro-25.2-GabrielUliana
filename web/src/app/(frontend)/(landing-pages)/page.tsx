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
        <div className="absolute top-24 right-4 z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl border "> 
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
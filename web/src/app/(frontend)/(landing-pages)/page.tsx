"use client"; 
import React, { useState, useEffect } from 'react';
import ProdutoCard from '@/components/ui/ProdutoCard';
import NaviBar from '@/components/ui/NaviBar';
import { Search } from 'lucide-react'; 

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}
type CartItem = {
  product: Product;
  quantity: number;
}

const productsData: Product [] = [
  {     id: 1, name: "Quebradeira capixaba", image: "/imgs/gaudio_mathias.png", description: "Contrate dois dançarinos profissionais!", price: 599.90 },
  { id: 2, name: "Bananinha Reggiani (importada)", image: "/imgs/bananinha.jpg", description: "A cachaça mais famosa do Brasil!", price: 79.90 },
  { id: 3, name: "Show de funk (DJ KN de VV)", image: "/imgs/show.jpg", description: "Show do melhor funk do Brasil, diretamente do ES!", price: 399.90 },
  { id: 4, name: "Moqueca capixaba", image: "/imgs/moqueca.avif", description: "A única moqueca de verdade!", price: 129.90 },
  { id: 5, name: "Ingresso Rio Branco X Desportiva", image: "/imgs/rio-branco-x-desportiva.png", description: "Maior clássico do futebol capixaba, jogo raiz de verdade!", price: 9.90 },
  { id: 6, name: "Chinelo havaianas branco", image: "/imgs/havaianas.webp", description: "Calçado oficial dos capixabas!", price: 29.90 }
]


export default function HomePage() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const storedCart = localStorage.getItem('027_cart_v2');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('027_cart_v2', JSON.stringify(cartItems));
  }, [cartItems]); 

  
  const handleAddToCart = (productToAdd: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product: productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productIdToRemove: number) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.product.id !== productIdToRemove);
    });
  };

  const handleIncrement = (productId: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const handleDecrement = (productId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productId);
      if (!existingItem) return prevItems;
      if (existingItem.quantity === 1) {
        return prevItems.filter(item => item.product.id !== productId);
      }
      return prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };
  
  const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = productsData
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => { 
      const minPriceNum = parseFloat(minPrice);
      const maxPriceNum = parseFloat(maxPrice);
      
      if (!isNaN(minPriceNum) && product.price < minPriceNum) {
        return false;
      }
      if (!isNaN(maxPriceNum) && product.price > maxPriceNum) {
        return false;
      }
      return true;
    });

  return (
    <>
      <NaviBar 
        cartCount={totalItemsCount}
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
            {cartItems.length > 0 ? cartItems.map((item) => (
              
              <div key={item.product.id} className="flex flex-col justify-between border-b pb-2">
                <span className="font-semibold">{item.product.name}</span>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDecrement(item.product.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-700 transition hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => handleIncrement(item.product.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-700 transition hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-700 font-medium">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

            ))
            :
              <p>Seu carrinho está vazio.</p>
            }
          </div>

          <div className="flex justify-between items-center mt-6 pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">
              R$ {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4 px-4 md:px-10 lg:px-20 pt-4 md:items-end">
        
        <div className="relative w-full md:w-1/2">
          <label className="block text-sm font-medium text-transparent">.</label>
          <div className="relative"> 
            <input
              type="text"
              placeholder="Buscar produto por nome..."
              className="w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-lg shadow-sm focus:border-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">
            Preço Mínimo
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              R$
            </span>
            <input
              id="min-price"
              type="number"
              placeholder="0,00"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 shadow-sm"
            />
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">
            Preço Máximo
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              R$
            </span>
            <input
              id="max-price"
              type="number"
              placeholder="1000,00"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 p-4 md:p-10 lg:px-20 pt-10 pb-20 md:grid-cols-2 lg:grid-cols-3">
        
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProdutoCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onRemoveFromCart={() => handleRemoveFromCart(product.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3">
            Nenhum produto encontrado com os filtros atuais.
          </p>
        )} 
      </div>
    </>
  );
}
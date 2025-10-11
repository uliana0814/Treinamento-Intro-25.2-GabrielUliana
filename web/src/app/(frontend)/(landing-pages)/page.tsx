import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import './assets/css/globals.css';




function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleRemoveFromCart = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
    }
  };

  return (
    <>
      <div className="NavigationBar">
        <div className="Left">
          <img src="assets/imgs/logo.png" alt="Logo 027 store" height="100px" />
        </div>
        <div className="Center">
          <h1>027 STORE!</h1>
        </div>
        <div className="Right">
          <img src="assets/imgs/user.webp" alt="Usuário" height="30px" />
          <h4>Usuário</h4>
          <img src="assets/imgs/cart.png" alt="Carrinho" height="30px" />
          {/* A contagem do carrinho agora vem do estado */}
          <h4>Carrinho({cartCount})</h4>
        </div>
      </div>

      <div className="Description">
        <p>A melhor loja de produtos e experiências capixabas!</p>
      </div>

      <div className="cards">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </>
  );
}

const products = [
{
    id: 1,
    name: 'Quebradeira capixaba',
    image: 'assets/imgs/gaudio_mathias.png',
    alt: 'Gaudio e mathias dançando',
    description: 'Contrate dois dançarinos profissionais diretamente do ES!',
    price: 'R$599,90 por hora',
  },
  {
    id: 2,
    name: 'Bananinha Reggiani (importada)',
    image: 'assets/imgs/bananinha.jpg',
    alt: 'Bananinha',
    description: 'A cachaça mais procurada de SP',
    price: 'R$79,90',
  },
  {
    id: 3,
    name: 'Show de funk (DJ KN de VV)',
    image: 'assets/imgs/show.jpg',
    alt: 'Show de funk (Dj Kn de VV)',
    description: 'Show do melhor DJ diretamente da Terra do Kn',
    price: 'R$ 299,90',
  },
];

export default App;
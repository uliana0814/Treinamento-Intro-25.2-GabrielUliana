interface ProductCard {
  product: {
    name: string;
    image: string;
    description: string;
    price: string;
  };
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

function ProductCard({ product, onAddToCart, onRemoveFromCart }: ProductCard) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <h3>{product.description}</h3>
      <p>{product.price}</p>
      <div className="buttons">
        <button onClick={onAddToCart}>Adicionar ao carrinho</button>
        <button onClick={onRemoveFromCart}>Remover do carrinho</button>
      </div>
    </div>
  );
}

export default ProductCard;
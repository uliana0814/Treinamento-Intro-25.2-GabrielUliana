interface ProductCardProps {
  product: {
    name: string;
    image: string;
    description: string;
    price: string;
  };
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

function ProdutoCard({ product, onAddToCart, onRemoveFromCart }: ProductCardProps) {
  return (
    <div className="flex flex-col w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg font-sans mx-auto">
    <img 
        src={product.image} 
        alt={product.name} 
        className="h-[300px] w-full rounded-lg object-cover mb-4"
      />
      
      <h2 className="mb-4 min-h-[50px] text-xl font-bold">
        {product.name}
      </h2>
      
      <h3 className="mb-4 text-lg font-normal flex-grow">
        {product.description}
      </h3>
      
      <p className="text-xl font-bold">
        {product.price}
      </p>
      
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button 
          onClick={onAddToCart}
          className="rounded-full border border-black bg-green-600 py-2 px-4 text-base text-black cursor-pointer transition hover:bg-green-500 hover:scale-105"
        >
          Adicionar ao carrinho
        </button>
        <button 
          onClick={onRemoveFromCart}
          className="rounded-full border border-black bg-red-600 py-2 px-4 text-base text-black cursor-pointer transition hover:bg-red-500 hover:scale-105"
        >
          Remover do carrinho
        </button>
      </div>
    </div>
  );
}

export default ProdutoCard;
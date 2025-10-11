import ProductCard from '@/components/ui/ProductCard';

function ProductList() {
  return (
    <div>
      <ProductCard 
        product={{
          name: "Quebradeira capixaba",
          image: "web/public/imgs/gaudio_mathias.png",
          description: "Contrate dois dançarinos profissionais!",
          price: "R$599,90 por hora"
        }}
        onAddToCart={() => console.log("Adicionado ao carrinho")}
        onRemoveFromCart={() => console.log("Removido do carrinho")}
      />
      <ProductCard 
        product={{
          name: "Bananinha Reggiani (importada)",
          image: "web/public/imgs/bananinha.png",
          description: "A cachaça mais famosa do Brasil!",
          price: "R$79,90"
        }}
        onAddToCart={() => console.log("Adicionado ao carrinho")}
        onRemoveFromCart={() => console.log("Removido do carrinho")}
      />
      <ProductCard 
        product={{
          name: "Show de funk (DJ KN de VV)",
          image: "web/public/imgs/show.png",
          description: "Show de funk diretamente do ES!",
          price: "R$599,90 por hora"
        }}
        onAddToCart={() => console.log("Adicionado ao carrinho")}
        onRemoveFromCart={() => console.log("Removido do carrinho")}
        />
    </div>
  );
}
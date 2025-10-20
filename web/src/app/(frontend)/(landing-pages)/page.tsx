import HomePageClient from './HomePageClient';

async function getProducts() {
  try {
    const res = await fetch('http://localhost:3000/api/produtos', {
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error("Falha ao buscar produtos: ", res.statusText);
      return []; 
    }

    return res.json();
  } catch (error) {
    console.error("Erro de conexão ao buscar produtos: ", error);
    return []; 
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <HomePageClient productsData={products} />
    </main>
  );
}
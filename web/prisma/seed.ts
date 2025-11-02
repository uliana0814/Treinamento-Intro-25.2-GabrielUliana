import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productsToCreate = [
  {
    name: "Quebradeira capixaba",
    image: "/imgs/gaudio_mathias.png",
    description: "Contrate dois dançarinos profissionais!",
    price: 599.90,
    categoryName: "Experiências"
  },
  {
    name: "Bananinha Reggiani (importada)",
    image: "/imgs/bananinha.jpg",
    description: "A cachaça mais famosa do Brasil!",
    price: 79.90,
    categoryName: "Bebida"
  },
  {
    name: "Show de funk (DJ KN de VV)",
    image: "/imgs/show.jpg",
    description: "Show do melhor funk do Brasil, diretamente do ES!",
    price: 399.90,
    categoryName: "Experiências"
  },
  {
    name: "Moqueca capixaba",
    image: "/imgs/moqueca.avif",
    description: "A única moqueca de verdade!",
    price: 129.90,
    categoryName: "Comida"
  },
  {
    name: "Ingresso Rio Branco X Desportiva",
    image: "/imgs/rio-branco-x-desportiva.png",
    description: "Maior clássico do futebol capixaba, jogo raiz de verdade!",
    price: 9.90,
    categoryName: "Experiências"
  },
  {
    name: "Chinelo havaianas branco",
    image: "/imgs/havaianas.webp",
    description: "Calçado oficial dos capixabas!",
    price: 29.90,
    categoryName: "Calçados"
  }
];

async function main() {
  console.log('Iniciando o script de seed...');

  console.log('Limpando dados antigos...');
  await prisma.produtoCategoria.deleteMany({});
  await prisma.produto.deleteMany({});
  await prisma.categoria.deleteMany({});

  console.log('Criando categorias...');
  const categorias = {
    "Comida": await prisma.categoria.create({ data: { nome: 'Comida' } }),
    "Bebida": await prisma.categoria.create({ data: { nome: 'Bebida' } }),
    "Calçados": await prisma.categoria.create({ data: { nome: 'Calçados' } }),
    "Experiências": await prisma.categoria.create({ data: { nome: 'Experiências' } })
  };
  console.log('Categorias criadas com sucesso!');

  console.log('Criando produtos...');
  for (const productData of productsToCreate) {
    const category = categorias[productData.categoryName as keyof typeof categorias];

    await prisma.produto.create({
      data: {
        nome: productData.name,
        descricao: productData.description,
        preco: productData.price,
        imagem: productData.image,
        categoria: {
          create: [
            {
             categoriaId: category.id,
            },
          ],
        },
      },
    });
  }
  console.log('Produtos criados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Ocorreu um erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seed finalizado com sucesso e conexão com o banco de dados fechada.');
  });
import { Hono } from 'hono';
import { apiKeyAuth } from '../middlewares/api-key-auth.middleware.js';

export const productsRoutes = new Hono();

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CreateProductRequest {
  name: string;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'Teclado', price: 350 },
  { id: '2', name: 'Mouse', price: 200 },
];

productsRoutes.get('/', (c) => {
  return c.json(products);
});

productsRoutes.get('/:id', (c) => {
  const { id } = c.req.param();
  const product = products.find((p) => p.id === id);
  if (!product) {
    return c.json({ message: 'Product not found' }, 404);
  }

  return c.json(product);
});

productsRoutes.post('/', apiKeyAuth, async (c) => {
  // lê e converte o corpo da requisição para JSON
  const body = await c.req.json<CreateProductRequest>();

  // cria um novo produto com base nos dados recebidos
  const newProduct = {
    id: String(products.length + 1), // gera um novo ID baseado no tamanho do array
    name: body.name,
    price: body.price,
  };

  if (!newProduct.name || !newProduct.price) {
    return c.json({ message: 'Name and price are required' }, 400);
  }

  // adiciona o novo produto ao array de produtos
  products.push(newProduct);

  // retorna o novo produto criado com status 201 (Created)
  return c.json(newProduct, 201);
});

productsRoutes.put('/:id', async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json<CreateProductRequest>();

  // encontra o produto no array com base no ID fornecido
  const productIndex = products.findIndex((p) => p.id === id);

  // verifica se o produto existe antes de tentar atualizá-lo
  if (productIndex === -1) {
    return c.json({ message: 'Product not found' }, 404);
  }

  // atualiza o produto com os novos dados fornecidos
  const updatedProduct = {
    ...products[productIndex],
    name: body.name,
    price: body.price,
  };

  // substitui o produto antigo pelo atualizado no array
  products[productIndex] = updatedProduct;

  // retorna o produto atualizado
  return c.json(updatedProduct);
});

productsRoutes.delete('/:id', (c) => {
  const { id } = c.req.param();

  // encontra o índice do produto no array com base no ID fornecido
  const productIndex = products.findIndex((p) => p.id === id);

  // verifica se o produto existe antes de tentar deletá-lo
  if (productIndex === -1) {
    return c.json({ message: 'Product not found' }, 404);
  }

  // remove o produto do array e armazena o produto deletado
  const deletedProduct = products.splice(productIndex, 1)[0];

  // retorna o produto deletado
  return c.json({
    message: `Product ${deletedProduct.name} deleted successfully`,
  });
});

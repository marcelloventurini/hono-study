import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';
import { logger } from 'hono/logger';

const app = new Hono();

app.use('*', logger());

app.onError((err, c) => {
  console.error('[erro na aplicação]:', err);
  return c.json({ message: 'Internal Server Error' }, 500);
});

const secretKey = 'secret';

const apiKeyAuth = createMiddleware(async (c, next) => {
  // lendo e armazenando o cabeçalho http
  const key = c.req.header('x-api-key');

  // comparação entre os valores
  if (key !== secretKey) {
    return c.json({ message: 'unauthorized: invalid api key' }, 401);
  }

  // permitindo o acesso passando o controle adiante
  await next();
});

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

app.get('/products', (c) => {
  return c.json(products);
});

app.get('/products/:id', (c) => {
  const { id } = c.req.param();
  const product = products.find((p) => p.id === id);
  if (!product) {
    return c.json({ message: 'Product not found' }, 404);
  }

  return c.json(product);
});

app.post('/products', apiKeyAuth, async (c) => {
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

app.put('/products/:id', async (c) => {
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

app.delete('/products/:id', (c) => {
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

app.get('/error', (c) => {
  // lança um erro proposital para testar o middleware de tratamento de erros
  throw new Error('This is a test error');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CreateProductRequest {
  name: string;
  price: number;
}

const produtcs: Product[] = [
  { id: '1', name: 'Teclado', price: 350 },
  { id: '2', name: 'Mouse', price: 200 },
];

app.get('/products', (c) => {
  return c.json(produtcs);
});

app.get('/products/:id', (c) => {
  const { id } = c.req.param();
  const product = produtcs.find((p) => p.id === id);
  if (!product) {
    return c.json({ message: 'Product not found' }, 404);
  }

  return c.json(product);
});

app.post('/products', async (c) => {
  // lê e converte o corpo da requisição para JSON
  const body = await c.req.json<CreateProductRequest>();

  // cria um novo produto com base nos dados recebidos
  const newProduct = {
    id: String(produtcs.length + 1), // gera um novo ID baseado no tamanho do array
    name: body.name,
    price: body.price,
  };

  if (!newProduct.name || !newProduct.price) {
    return c.json({ message: 'Name and price are required' }, 400);
  }

  // adiciona o novo produto ao array de produtos
  produtcs.push(newProduct);

  // retorna o novo produto criado com status 201 (Created)
  return c.json(newProduct, 201);
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

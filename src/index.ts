import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

const produtcs = [
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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

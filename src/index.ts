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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

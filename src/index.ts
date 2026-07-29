import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { productsRoutes } from './routes/products.routes.js';

const app = new Hono();

app.use('*', logger());

app.route('/products', productsRoutes);

app.onError((err, c) => {
  console.error('[erro na aplicação]:', err);
  return c.json({ message: 'Internal Server Error' }, 500);
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

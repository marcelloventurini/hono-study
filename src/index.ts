import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { errorHandler } from './middlewares/on-error.handler.js';
import { productsRoutes } from './routes/products.routes.js';

const app = new Hono();

app.use('*', logger());
app.onError(errorHandler);

app.route('/products', productsRoutes);

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

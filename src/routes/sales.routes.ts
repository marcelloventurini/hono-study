import { Hono } from 'hono';

const app = new Hono();

const sales = [
  { id: 1, total: 30.2 },
  { id: 1, total: 20.0 },
];

app.get('/', (c) => {
  return c.json(sales);
});

export { app as salesRoutes };

import { Hono, type ErrorHandler } from 'hono';

const app = new Hono();

export const errorHandler: ErrorHandler = (err, c) => {
  console.error('[erro na aplicação]:', err);
  return c.json({ message: 'internal server error' }, 500);
};

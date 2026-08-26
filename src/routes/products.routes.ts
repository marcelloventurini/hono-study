import { sValidator } from '@hono/standard-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { db } from '../db/index.db.js';
import { products } from '../db/schemas/products.schemas.js';
import { apiKeyAuth } from '../middlewares/api-key-auth.middleware.js';
import {
  createProductSchema,
  idParamSchema,
  updateProductSchema,
} from '../validators/product.validator.js';

const app = new Hono();

app.get('/', async (c) => {
  const products = await db.query.products.findMany();
  return c.json(products);
});

app.get('/:id', sValidator('param', idParamSchema), async (c) => {
  const { id } = c.req.valid('param');
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  if (!product) {
    return c.json({ message: 'Product not found' }, 404);
  }

  return c.json(product);
});

app.post(
  '/',
  apiKeyAuth,
  sValidator('json', createProductSchema),
  async (c) => {
    const data = c.req.valid('json');
    const product = await db.insert(products).values(data).returning();

    return c.json(product, 201);
  },
);

app.put(
  '/:id',
  sValidator('json', updateProductSchema),
  sValidator('param', idParamSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');

    const product = await db
      .update(products)
      .set(body)
      .where(eq(products.id, id))
      .returning();

    if (product.length === 0) {
      return c.json({ message: 'Product not found' }, 404);
    }

    return c.json(product);
  },
);

// app.delete('/:id', sValidator('param', idParamSchema), (c) => {
//   const { id } = c.req.valid('param');

//   // encontra o índice do produto no array com base no ID fornecido
//   const productIndex = products.findIndex((p) => p.id === id);

//   // verifica se o produto existe antes de tentar deletá-lo
//   if (productIndex === -1) {
//     return c.json({ message: 'Product not found' }, 404);
//   }

//   // remove o produto do array e armazena o produto deletado
//   const deletedProduct = products.splice(productIndex, 1)[0];

//   // retorna o produto deletado
//   return c.json({
//     message: `Product ${deletedProduct.name} deleted successfully`,
//   });
// });

export { app as productsRoutes };

import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';
import { apiKeyAuth } from '../middlewares/api-key-auth.middleware.js';
import {
  createProductSchema,
  idParamSchema,
  updateProductSchema,
  type Product,
} from '../schemas/product.schemas.js';

const app = new Hono();

export const products: Product[] = [
  { id: '1', name: 'Teclado', price: 350 },
  { id: '2', name: 'Mouse', price: 200 },
];

app.get('/', (c) => {
  return c.json(products);
});

app.get('/:id', sValidator('param', idParamSchema), (c) => {
  const { id } = c.req.valid('param');
  const product = products.find((p) => p.id === id);
  if (!product) {
    return c.json({ message: 'Product not found' }, 404);
  }

  return c.json(product);
});

app.post('/', apiKeyAuth, sValidator('json', createProductSchema), (c) => {
  // lê e converte o corpo da requisição para JSON
  const body = c.req.valid('json');

  // cria um novo produto com base nos dados recebidos
  const newProduct = {
    id: String(products.length + 1), // gera um novo ID baseado no tamanho do array
    ...body,
  };

  // adiciona o novo produto ao array de produtos
  products.push(newProduct);

  // retorna o novo produto criado com status 201 (Created)
  return c.json(newProduct, 201);
});

app.put(
  '/:id',
  sValidator('json', updateProductSchema),
  sValidator('param', idParamSchema),
  (c) => {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');

    // encontra o produto no array com base no ID fornecido
    const productIndex = products.findIndex((p) => p.id === id);

    // verifica se o produto existe antes de tentar atualizá-lo
    if (productIndex === -1) {
      return c.json({ message: 'Product not found' }, 404);
    }

    // atualiza o produto com os novos dados fornecidos
    const updatedProduct = {
      ...products[productIndex],
      ...body,
    };

    // substitui o produto antigo pelo atualizado no array
    products[productIndex] = updatedProduct;

    // retorna o produto atualizado
    return c.json(updatedProduct);
  },
);

app.delete('/:id', sValidator('param', idParamSchema), (c) => {
  const { id } = c.req.valid('param');

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

export { app as productsRoutes };

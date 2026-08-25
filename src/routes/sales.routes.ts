// import { sValidator } from '@hono/standard-validator';
// import { Hono } from 'hono';
// import { createSaleSchema, type Sale } from '../validators/sale.validator.js';
// import { products } from './products.routes.js';

// const app = new Hono();

// const sales: Sale[] = [
//   {
//     id: '1',
//     items: [{ productId: '1', quantity: 1, price: 350 }],
//     total: 350,
//   },
// ];

// app.get('/', (c) => {
//   return c.json(sales);
// });

// app.post('/', sValidator('json', createSaleSchema), (c) => {
//   const body = c.req.valid('json');
//   // array usado para armazenar os items da venda
//   const saleItems = [];
//   let total = 0;

//   // percorrendo o array de items
//   for (const item of body.items) {
//     // pegando o produto com base no id
//     const product = products.find((p) => p.id === item.productId);

//     if (!product) return c.json({ message: 'product not found' }, 404);

//     const subtotal = product.price * item.quantity;
//     total += subtotal;

//     // adicionando os itens do pedido
//     saleItems.push({
//       productId: product.id,
//       quantity: item.quantity,
//       price: product.price,
//     });
//   }

//   // criando uma nova venda
//   const newSale = {
//     id: String(sales.length + 1),
//     items: saleItems,
//     total: total,
//   };

//   sales.push(newSale);

//   return c.json(newSale, 201);
// });

// export { app as salesRoutes };

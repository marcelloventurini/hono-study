import z from 'zod';

export const saleSchema = z.object({
  id: z.string(),
  items: z
    .object({
      productId: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
    .array(),
  total: z.number(),
});

export const itemSchema = saleSchema.shape.items.element;
export const createItemSchema = itemSchema.omit({ price: true });

export const createSaleSchema = saleSchema
  .extend({
    items: z.array(createItemSchema),
  })
  .omit({ id: true, total: true });

export type Sale = z.infer<typeof saleSchema>;

// export interface Sale {
//   id: string;
//   items: { productId: string; quantity: number; price: number }[];
//   total: number;
// }

// necessário para realizar uma venda: produtos, quantidade de produtos, preço dos produtos
// export interface CreateSaleRequest {
//   items: {
//     productId: string;
//     quantity: number;
//   }[];
// }

import z from 'zod';

export const createItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
});

export const itemSchema = createItemSchema.extend({
  price: z.number().positive(),
});

export const createSaleSchema = z.object({
  items: z.array(createItemSchema),
});

export const saleSchema = createSaleSchema.extend({
  id: z.string(),
  items: z.array(itemSchema),
  total: z.number().positive(),
});

export type Sale = z.infer<typeof saleSchema>;

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

// o `.shape` é como o Zod nos dá acesso direto às propriedades do objeto
// `saleSchema.shape.items` pega especificamente o schema que define o array de itens
export const itemSchema = saleSchema.shape.items.element;

// criando um novo esquema sem o campo `price`
export const createItemSchema = itemSchema.omit({ price: true });

// substitui apenas o campo `items` no schema pai
export const createSaleSchema = saleSchema
  .extend({
    items: z.array(createItemSchema),
  })
  .omit({ id: true, total: true });

export type Sale = z.infer<typeof saleSchema>;

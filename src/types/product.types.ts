import z from 'zod';

// schema do produto completo
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
});

// schema de criação
export const createProductSchema = productSchema.omit({ id: true });

export type Product = z.infer<typeof productSchema>;

import z from 'zod';

// schema do produto completo
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
});

export const idParamSchema = z.object({
  id: z.string().min(1),
});

export const createProductSchema = productSchema.omit({ id: true });
export const updateProductSchema = createProductSchema.partial();

export type Product = z.infer<typeof productSchema>;

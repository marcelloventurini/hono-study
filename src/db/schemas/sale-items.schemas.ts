import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { products } from './products.schemas.js';
import { sales } from './sales.schemas.js';

export const saleItems = sqliteTable('sale_items', {
  id: text().primaryKey(),
  saleId: text('sale_id')
    .notNull()
    .references(() => sales.id, { onDelete: 'cascade' }),
  productId: text('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer().notNull(),
  price: real().notNull(),
});

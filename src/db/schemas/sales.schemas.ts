import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sales = sqliteTable('sales', {
  id: text().primaryKey(),
  total: real().notNull(),
  createdAt: text('created_at').notNull(),
});

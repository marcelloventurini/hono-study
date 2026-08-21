import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schemas/index.schemas.js';

const client = createClient({ url: process.env.DB_URL! });
export const db = drizzle(client, { schema });

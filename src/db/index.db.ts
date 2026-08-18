import Database from 'better-sqlite3';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/better-sqlite3';

// abre a conexão com o sqlite
const sqlite = new Database(process.env.DB_URL!);

// instancia o cliente do Drizzle passando a conexão
export const db = drizzle({ client: sqlite });

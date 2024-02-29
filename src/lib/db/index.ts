import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: connectionString });
const db = drizzle(pool, { schema });

export { db };

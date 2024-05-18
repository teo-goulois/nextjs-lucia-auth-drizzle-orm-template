import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default defineConfig({
  schema: "src/lib/db/schema",
  dialect: "postgresql",
  out: "src/lib/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});

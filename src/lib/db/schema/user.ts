import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique(),
  username: text("username"),
  hashed_password: text("hashed_password"),
  email_verified: boolean("email_verified").notNull().default(false),
});

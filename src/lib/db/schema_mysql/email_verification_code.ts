import { createId } from "@paralleldrive/cuid2";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { userTable } from "./user";

export const emailVerificationCodeTable = mysqlTable(
  "email_verification_code",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => createId()),
    code: varchar("code", { length: 255 }).notNull(),
    user_id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => userTable.id),
    email: varchar("email", { length: 255 }).notNull(),
    expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
  }
);

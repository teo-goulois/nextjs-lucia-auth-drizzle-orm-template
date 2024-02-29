import { eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";
import { db } from "../db";
import { sessionTable, userTable } from "../db/schema";

export const getSessionForMiddleware = async (sessionId: string | null) => {
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await db
    .select({
      user: userTable,
      session: sessionTable,
    })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length !== 1)
    return {
      user: null,
      session: null,
    };

  const { session, user } = result[0];
  if (!user) {
    return { session: null, user: null };
  }
  if (!isWithinExpirationDate(session.expiresAt)) {
    return { session: null, user: null };
  }

  return { session, user };
};

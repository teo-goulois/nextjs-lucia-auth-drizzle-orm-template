import { eq } from "drizzle-orm";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { db } from "../db";
import { passwordResetTokenTable, sessionTable, userTable } from "../db/schema";
import { generateId } from "lucia";
import { createTOTPKeyURI } from "oslo/otp";
import { encodeHex } from "oslo/encoding";

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

export async function createPasswordResetToken(
  userId: string
): Promise<string> {
  await db
    .delete(passwordResetTokenTable)
    .where(eq(passwordResetTokenTable.user_id, userId));

  const tokenId = generateId(40);
  await db.insert(passwordResetTokenTable).values({
    id: tokenId,
    user_id: userId,
    expires_at: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}

export function createOtpCode(email: string) {
  const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20));
  const uri = createTOTPKeyURI("localhost:3000", email, twoFactorSecret);

  return {
    uri,
    secret: encodeHex(twoFactorSecret),
  };
}

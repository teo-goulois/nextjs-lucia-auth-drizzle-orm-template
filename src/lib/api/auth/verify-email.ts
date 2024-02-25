"use server";

import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { emailVerificationCodeTable } from "@/lib/db/schema";
import { action } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import { z } from "zod";
const verifyEmailSchema = z.object({
  code: z.string(),
});
export const verifyEmail = action(verifyEmailSchema, async ({ code }) => {
  console.log("verifu email", code);

  const validCode = await verifyVerificationCode(code);
  console.log({ validCode });
  
  if (!validCode) {
    throw new Error("Invalid code");
  }

  const session = await lucia.createSession(validCode.user_id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie);

  return redirect("/protected");
});

async function verifyVerificationCode(code: string) {
  const data = await db.transaction(async (tx) => {
    const databaseCode = await tx.query.emailVerificationCodeTable.findFirst({
      where: (emailVerificationCode, { eq }) =>
        eq(emailVerificationCode.code, code),
    });
    console.log({ databaseCode });
    
    if (!databaseCode || !databaseCode.id) {
      return false;
    }
    await db
      .delete(emailVerificationCodeTable)
      .where(eq(emailVerificationCodeTable.id, databaseCode.id));
    if (!isWithinExpirationDate(databaseCode.expires_at)) {
        console.log("expired");
        
      return false;
    }
    return databaseCode;
  });
  return data;
}

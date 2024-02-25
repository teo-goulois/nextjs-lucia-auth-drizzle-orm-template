"use server";

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendEmailVerificationCode } from "./mails";
import { userTable } from "@/lib/db/schema";
import { generateId } from "lucia";

const registerSchema = z.object({
  email: z.string().email(),
});
export const register = action(registerSchema, async ({ email }) => {
  // check if user exists
  const existingUser = await db.query.userTable.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // create user
  const userId = generateId(15);

  await db.insert(userTable).values({
    email,
    id: userId,
  });

  // send magic link
  await sendEmailVerificationCode({
    email,
    userId: userId,
  });

  redirect(`/auth/verify-email?email=${email}`);
});

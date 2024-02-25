import { db } from "@/lib/db";
import { emailVerificationCodeTable } from "@/lib/db/schema";
import { resend } from "@/lib/resend";
import { eq } from "drizzle-orm";

import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

import { EmailTemplate } from "../../../../emails/email-template";

async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  await db
    .delete(emailVerificationCodeTable)
    .where(eq(emailVerificationCodeTable.user_id, userId));

  const code = generateRandomString(8, alphabet("0-9"));
  await db.insert(emailVerificationCodeTable).values({
    user_id: userId,
    email,
    code,
    expires_at: createDate(new TimeSpan(5, "m")), // 5 minutes
  });
  return code;
}

export const sendEmailVerificationCode = async ({
  email,
  userId,
}: {
  userId: string;
  email: string;
}) => {
  console.log("Sending email verification code");

  const code = await generateEmailVerificationCode(userId, email);
  console.log({ code });

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [email],
      subject: "Hello world",
      text: `Your email verification code is: ${code}`,
      // react: EmailTemplate({ firstName: "John", code }),
    });
  } catch (error) {
    console.log("Failed to send email", error);
    throw new Error("Failed to send email");
  }
};

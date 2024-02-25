"use server";
import { github, google } from "@/lib/auth/providers";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendEmailVerificationCode } from "./mails";
import { loginValidator } from "@/lib/validators/authValidator";

export const loginWithMagicLink = action(
  loginValidator,
  async ({ email, withoutRedirect }) => {
    // check if user exists
    const existingUser = await db.query.userTable.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    if (!existingUser) {
      throw new Error("Invalid email");
    }
    // send magic link
    await sendEmailVerificationCode({
      email,
      userId: existingUser.id,
    });
    if (withoutRedirect) return { data: "success" };
    redirect(`/auth/verify-email?email=${email}`);
  }
);

export const loginWithGithub = async () => {
  const state = generateState();

  const url = await github.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });
  cookies().set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return redirect(url.toString());
};

export const loginWithGoogle = async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return redirect(url.toString());
};

"use server";
import { github } from "@/lib/auth/providers";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export const loginWithGithub = async () => {
  const state = generateState();
  const url = await github.createAuthorizationURL(state);

  cookies().set("github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
};

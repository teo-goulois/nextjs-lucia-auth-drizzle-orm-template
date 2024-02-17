import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  console.log({ code, state, storedState });

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }
  console.log("passed state check");

  try {
    const tokens = await github.validateAuthorizationCode(code);
    console.log({ tokens });

    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    console.log({ githubUserResponse });

    const githubUser: GitHubUser = await githubUserResponse.json();
    console.log({ githubUser });

    // Replace this with your own DB client.

    const existingUser = await db.query.userTable.findFirst({
      where: (user, { eq }) => eq(user.github_id, githubUser.id),
    });
    console.log({ existingUser });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);

    // Replace this with your own DB client.
    await db.insert(userTable).values({
      id: userId,
      github_id: githubUser.id,
      username: githubUser.login,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      console.log(e.message);

      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
}

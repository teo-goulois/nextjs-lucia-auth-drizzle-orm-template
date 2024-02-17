import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/login");
  }
  return (
    <div>
      <h1>Hi, {user.username}!</h1>
    </div>
  );
}

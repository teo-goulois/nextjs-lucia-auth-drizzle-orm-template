import { LogoutButton } from "@/components/auth/LogoutButton";
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
    <div className="flex justify-center items-center gap-4 flex-col h-dvh">
      <h1>Hi, {user.email}!</h1>
      <LogoutButton />
    </div>
  );
}

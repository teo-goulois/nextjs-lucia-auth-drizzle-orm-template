import { LogoutButton } from "@/components/auth/LogoutButton";
import { TwoFactorAuthForm } from "@/components/auth/TwoFactorAuthForm";
import { validateRequest } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = await validateRequest();
  const t = await getTranslations('Protected')
  if (!user) {
    return null;
  }
  return (
    <div className="flex justify-center items-center gap-4 flex-col h-dvh">
      <h1>
        {t("title")} {user.email}!
      </h1>
      <TwoFactorAuthForm />
      <LogoutButton />
    </div>
  );
}

import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations('VerifyEmail')
  const email = searchParams.email;
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <div className="flex flex-col min-h-[40px]  gap-2 pb-2">
          <h1 className="text-xl font-medium">{t('title')} </h1>
          <p className="">
            {t('subtitle')} <strong>{email ?? "unknown"}</strong>
          </p>
        </div>
        <VerifyEmailForm />

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col  text-sm">
          <p>{t('unreceived.text')}</p>
          <p>
            {t('unreceived.check')} <Link href={`#`}>{t('unreceived.contact')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

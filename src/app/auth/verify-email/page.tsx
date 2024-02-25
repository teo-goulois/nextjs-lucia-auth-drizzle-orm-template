import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="h-full flex items-center justify-center">
      <VerifyEmailForm />
    </div>
  );
}

import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";
import { verifyEmail } from "@/lib/api/auth/verify-email";
import Link from "next/link";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const email = searchParams.email;
  return (
    <div className="h-full flex items-center justify-center">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Verify your email</h1>
          <p className="text-foreground">
            Enter the code we sent to <strong>{email ?? "unknown"}</strong>
          </p>
        </div>
        <VerifyEmailForm />

        <div className="text-center text-sm space-y-2">
          <p>Didn&apos;t receive the code?</p>
          <p>
            Check your spam folder or <Link href={`#`}>Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

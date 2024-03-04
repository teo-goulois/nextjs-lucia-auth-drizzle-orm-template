export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold my-4">Terms of Service</h1>
      {/* Your privacy policy content here */}
      <p>
        By using our website, you agree to provide accurate and complete
        information when logging in with Providers. You are responsible for
        maintaining the confidentiality of your account and for all activities
        that occur under your account. You agree to use our website only for
        lawful purposes and not to engage in any activity that could harm our
        website or other users.
      </p>
      {/* Add more content as needed */}
    </div>
  );
}

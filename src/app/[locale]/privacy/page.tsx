export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold my-4">Privacy Policy</h1>
      {/* Your privacy policy content here */}
      <p>
        We collect only your email address and profile information when you log
        in with Providers. This information is used solely for logging you into our
        website and is not used for any other purpose. Your email address is
        stored securely and is not shared with any third parties, except as
        required to comply with the law.
      </p>
      {/* Add more content as needed */}
    </div>
  );
}

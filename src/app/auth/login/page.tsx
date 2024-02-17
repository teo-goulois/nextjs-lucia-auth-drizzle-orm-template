export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Login</h1>
      <a href="/api/login/github">Sign in with GitHub</a>
    </div>
  );
}

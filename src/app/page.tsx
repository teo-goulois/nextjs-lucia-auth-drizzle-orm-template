import Link from "next/link";

export default function Home() {
  return (
    <main>
      main
      <Link href={"/protected"}>protected</Link>
    </main>
  );
}

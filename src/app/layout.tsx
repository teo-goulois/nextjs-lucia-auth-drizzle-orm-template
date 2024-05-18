import { ReactNode } from "react";
import "@/app/globals.css";
import { locales } from "@/navigation";

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

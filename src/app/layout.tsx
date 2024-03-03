import { SessionProvider } from "@/components/auth/SessionProvider";
import { Providers } from "@/components/provider/Providers";
import { fontMono, fontSans } from "@/config/font";
import { metadata } from "@/config/metadata";
import { viewport } from "@/config/viewport";
import { validateRequest } from "@/lib/auth";
import { cn } from "@nextui-org/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Script from "next/script";

export const siteMetadata = metadata;
export const siteViewport = viewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();

  return (
    <html lang="en">
      <Script
        async
        src={process.env.UMAMI_SRC}
        data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
      />
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          "min-h-screen h-screen"
        )}>
        <SessionProvider session={session}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

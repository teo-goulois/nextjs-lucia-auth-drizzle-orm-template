import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { Providers } from "@/components/provider/Providers";
import { fontMono, fontSans } from "@/config/font";
import { validateRequest } from "@/lib/auth";
import Script from "next/script";
import "./globals.css";

import viewportConfig  from "@/config/viewport";
import metadataConfig from "@/config/metadata";
import { cn } from "@/lib/utils";


export const metadata = metadataConfig;
export const viewport = viewportConfig;

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

import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { Providers } from "@/components/provider/Providers";
import { fontMono, fontSans } from "@/config/font";
import { validateRequest } from "@/lib/auth";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";

import viewportConfig from "@/config/viewport";
import metadataConfig from "@/config/metadata";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/Footer";

export const metadata = metadataConfig;
export const viewport = viewportConfig;

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const session = await validateRequest();
  const messages = await getMessages();
  return (
    <html lang={locale}>
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider session={session}>
            <Providers>
              <Navbar />
              {children}
              <Footer />
            </Providers>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

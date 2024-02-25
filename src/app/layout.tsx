import { fontMono, fontSans } from "@/config/font";
import { cn } from "@nextui-org/react";
import "./globals.css";
import { metadata } from "@/config/metadata";
import { viewport } from "@/config/viewport";
import { Providers } from "@/components/provider/Providers";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { validateRequest } from "@/lib/auth";

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
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          "min-h-screen h-screen"
        )}>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

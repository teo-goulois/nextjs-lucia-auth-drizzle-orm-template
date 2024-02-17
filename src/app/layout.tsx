import { fontMono, fontSans } from "@/config/font";
import { cn } from "@nextui-org/react";
import "./globals.css";
import { metadata } from "@/config/metadata";
import { viewport } from "@/config/viewport";
import { Providers } from "@/components/provider/Providers";

export const siteMetadata = metadata;
export const siteViewport = viewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontSans.variable, fontMono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { Toaster } from "../ui/Toaster";
import { useRouter } from "@/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <NextUIProvider navigate={(e) => router.push(e as any)} className="h-full">
      <NextThemesProvider {...themeProps} defaultTheme="dark" attribute="class">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

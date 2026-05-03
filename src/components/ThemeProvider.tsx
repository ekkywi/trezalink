"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Gunakan state mounted untuk memastikan script hanya dieksekusi dengan aman
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Jika belum mounted (masih di server), tetap render children 
  // agar SEO tetap terjaga, tapi biarkan NextThemesProvider menangani atributnya.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
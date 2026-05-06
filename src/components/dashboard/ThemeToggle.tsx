"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Pastikan menggunakan NAMED EXPORT (tanpa kata 'default')
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Mencegah hydration mismatch error pada Next.js
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-[#2A2A2A] text-gray-500 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-[#333]"
      title="Toggle Theme"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
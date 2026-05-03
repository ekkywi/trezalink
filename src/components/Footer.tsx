import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200 dark:border-white/10 bg-transparent pt-12 pb-8 w-full overflow-hidden transition-colors duration-300">
      
      <div className="absolute bottom-[-50%] left-1/2 -translate-x-1/2 w-[50%] h-[100%] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none transition-colors"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5 transition-colors">
            <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            Kirupay
          </div>
          <p className="text-xs text-gray-500 font-medium transition-colors">
            © {new Date().getFullYear()} Kirupay. Borderless economy.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors">
          <Link href="/architecture" className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Architecture</Link>
          <Link href="/developer" className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">API</Link>
          <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Documentation</Link>
          <div className="w-[1px] h-5 bg-gray-300 dark:bg-white/10 hidden md:block transition-colors"></div>
          <Link href="https://github.com/trezanix" target="_blank" className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1">
            GitHub
          </Link>
        </div>

      </div>
    </footer>
  );
}
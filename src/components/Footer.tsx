import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
        <div>
          KIRUPAY CORE v1.0.0
        </div>
        <div className="flex gap-6">
          <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
          <Link href="/status" className="hover:text-white transition-colors">Status: Operational</Link>
          <Link href="https://github.com/trezanix" target="_blank" className="hover:text-white transition-colors">GitHub Repo</Link>
        </div>
      </div>
    </footer>
  );
}
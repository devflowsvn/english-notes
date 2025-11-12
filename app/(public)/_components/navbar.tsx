"use client";

import { Check, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-700 bg-zinc-900 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <Check className="text-green-400" /> ENGLISH NOTES
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-2 h-full">
          <li className="border border-zinc-700 h-full flex items-center justify-center px-5 rounded hover:bg-zinc-800">
            <Link href="/" className="font-medium">
              Trang chủ
            </Link>
          </li>
          <li className="border border-zinc-700 h-full flex items-center justify-center px-5 rounded hover:bg-zinc-800">
            <Link href="/" className="font-medium">
              Kiến thức
            </Link>
          </li>
          <li className="border border-zinc-700 h-full flex items-center justify-center px-5 rounded hover:bg-zinc-800">
            <Link href="/vocabulary" className="font-medium">
              Từ vựng
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded hover:bg-zinc-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-700">
          <ul className="flex flex-col">
            <li className="border-b border-zinc-700">
              <Link
                href="/"
                className="block px-4 py-3 font-medium hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Trang chủ
              </Link>
            </li>
            <li className="border-b border-zinc-700">
              <Link
                href="/"
                className="block px-4 py-3 font-medium hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Kiến thức
              </Link>
            </li>
            <li className="border-b border-zinc-700">
              <Link
                href="/vocabulary"
                className="block px-4 py-3 font-medium hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Từ vựng
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

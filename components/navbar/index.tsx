"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
  { label: "Clubs", href: "/club" },
  { label: "Events", href: "/club/Photography-Lab" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle sticky navigation
  const handleScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Navigation Link Component
  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className="text-sm text-gray-300 transition-colors hover:text-white"
    >
      {children}
    </Link>
  );

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isSticky
          ? "bg-black/50 backdrop-blur-xl"
          : "bg-transparent backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/logo-white.png"
                alt="Crop Studio"
                width={150}
                height={100}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigationLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Sign In Button */}
          <Link
            href="/signin"
            className="hidden rounded border border-transparent px-4 py-2 text-white transition-all hover:border-red-500 hover:text-gray-300 md:block"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-gray-800 bg-black md:hidden">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-6 py-3 text-gray-300 hover:bg-gray-900 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3">
              <button className="w-full rounded border border-transparent px-4 py-2 text-white transition-all hover:border-red-500 hover:text-gray-300">
                Sign in
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;

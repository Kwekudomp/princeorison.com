"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll effect: add border and reduce padding after 50px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-bg-primary/95 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border-subtle shadow-sm"
          : ""
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto flex justify-between items-center px-[5%] transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="uppercase tracking-[3px] font-body font-semibold text-sm text-text-primary"
        >
          PRINCE ORISON
        </Link>

        {/* Desktop links */}
        <div className="hidden min-[968px]:flex gap-12 items-center">
          <Link
            href="/collections"
            className="text-sm font-medium tracking-wide text-text-primary hover:text-text-secondary transition"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium tracking-wide text-text-primary hover:text-text-secondary transition"
          >
            About
          </Link>
          <a
            href="https://wa.me/233245099930"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="min-[968px]:hidden flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-text-primary my-[3px] transition-all duration-300 ${
              isMenuOpen
                ? "rotate-45 translate-y-[4.5px]"
                : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary my-[3px] transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary my-[3px] transition-all duration-300 ${
              isMenuOpen
                ? "-rotate-45 -translate-y-[4.5px]"
                : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-[72px] bg-bg-primary flex flex-col p-8 gap-6 min-[968px]:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link
          href="/collections"
          className="text-lg font-medium tracking-wide text-text-primary hover:text-text-secondary transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Collections
        </Link>
        <Link
          href="/about"
          className="text-lg font-medium tracking-wide text-text-primary hover:text-text-secondary transition"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <a
          href="https://wa.me/233245099930"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-white px-6 py-3 rounded-full text-base font-medium tracking-wide text-center hover:bg-accent-dark transition-all w-full mt-2"
          onClick={() => setIsMenuOpen(false)}
        >
          WhatsApp Us
        </a>
      </div>
    </nav>
  );
}

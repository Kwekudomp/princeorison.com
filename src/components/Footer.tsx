import Link from "next/link";
import GhanaFlag from "./GhanaFlag";

export default function Footer() {
  return (
    <footer className="bg-dark-section text-white">
      {/* Top gold accent line */}
      <div className="h-px bg-accent" />

      <div className="max-w-[1400px] mx-auto px-[5%] py-16">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <h3 className="tracking-[3px] font-semibold text-sm">
              PRINCE ORISON
            </h3>
            <p className="text-text-secondary italic mt-2 text-sm">
              Detailed to Perfection
            </p>
            <div className="mt-4">
              <GhanaFlag />
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="text-xs tracking-[3px] font-semibold mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections"
                  className="text-sm text-white/70 hover:text-accent transition"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 hover:text-accent transition"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/233245099930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-accent transition"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-xs tracking-[3px] font-semibold mb-4">
              CONTACT
            </h3>
            <div className="space-y-2 text-sm text-white/70">
              <p>Achimota ABC, Accra, Ghana</p>
              <p>GPS: GE-370-8751</p>
              <p>
                <a
                  href="mailto:princeorison1@gmail.com"
                  className="hover:text-accent transition"
                >
                  princeorison1@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+233245099930"
                  className="hover:text-accent transition"
                >
                  +233 24 509 9930
                </a>
              </p>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/princeorison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-semibold text-white/70 hover:bg-accent hover:border-accent hover:text-white transition-all hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://www.tiktok.com/@princeorison"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-semibold text-white/70 hover:bg-accent hover:border-accent hover:text-white transition-all hover:-translate-y-0.5"
                aria-label="TikTok"
              >
                TT
              </a>
              <a
                href="https://wa.me/233245099930"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-xs font-semibold text-white/70 hover:bg-accent hover:border-accent hover:text-white transition-all hover:-translate-y-0.5"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/50 tracking-[2px]">
            &copy; 2026 PRINCE ORISON FASHION HOUSE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

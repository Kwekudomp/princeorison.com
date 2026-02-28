import Link from "next/link";

interface CTASectionProps {
  title: string;
  subtitle: string;
  variant?: "light" | "dark";
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export default function CTASection({
  title,
  subtitle,
  variant = "light",
  primaryHref = "https://wa.me/233245099930",
  primaryLabel = "WhatsApp Us",
  secondaryHref = "#",
  secondaryLabel = "Visit Showroom",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-24 px-[5%] text-center ${
        isDark ? "bg-dark-section text-white" : "bg-bg-surface"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-xs tracking-[3px] uppercase text-accent font-semibold">
          READY TO ELEVATE YOUR STYLE?
        </p>
        <h2
          className={`font-display text-4xl md:text-5xl font-light mt-4 leading-tight ${
            isDark ? "text-white" : "text-text-primary"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-6 text-lg leading-relaxed ${
            isDark ? "text-white/70" : "text-text-secondary"
          }`}
        >
          {subtitle}
        </p>

        <div className="flex gap-4 justify-center mt-10 flex-wrap">
          {/* Primary button */}
          {primaryHref.startsWith("http") || primaryHref.startsWith("https") ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="bg-accent text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {primaryLabel}
            </Link>
          )}

          {/* Secondary button */}
          {secondaryHref.startsWith("http") ||
          secondaryHref.startsWith("https") ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`border-2 px-8 py-4 rounded-full font-medium tracking-wide transition-all ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-dark-section"
                  : "border-text-primary text-text-primary hover:bg-text-primary hover:text-white"
              }`}
            >
              {secondaryLabel}
            </a>
          ) : (
            <Link
              href={secondaryHref}
              className={`border-2 px-8 py-4 rounded-full font-medium tracking-wide transition-all ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-dark-section"
                  : "border-text-primary text-text-primary hover:bg-text-primary hover:text-white"
              }`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

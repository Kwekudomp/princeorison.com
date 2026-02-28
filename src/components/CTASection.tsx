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
      className={`py-24 px-[5%] text-center relative overflow-hidden ${
        isDark ? "bg-dark-section text-white" : "prismatic-bg"
      }`}
    >
      {/* Light sweep overlay (light variant only) */}
      {!isDark && <div className="light-sweep absolute inset-0 pointer-events-none" />}

      <div className="max-w-2xl mx-auto relative z-10">
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
          {/* Primary button — frosted glass gold */}
          {primaryHref.startsWith("http") || primaryHref.startsWith("https") ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,176,107,0.3)] transition-all"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="bg-accent/90 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,176,107,0.3)] transition-all"
            >
              {primaryLabel}
            </Link>
          )}

          {/* Secondary button — glass outline */}
          {secondaryHref.startsWith("http") ||
          secondaryHref.startsWith("https") ? (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-btn px-8 py-4 rounded-full font-medium tracking-wide ${
                isDark
                  ? "text-white border-white/30"
                  : "text-text-primary"
              }`}
            >
              {secondaryLabel}
            </a>
          ) : (
            <Link
              href={secondaryHref}
              className={`glass-btn px-8 py-4 rounded-full font-medium tracking-wide ${
                isDark
                  ? "text-white border-white/30"
                  : "text-text-primary"
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

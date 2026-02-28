"use client";

import ScrollReveal from "./ScrollReveal";

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every stitch tells a story of dedication and precision. Each piece is crafted with meticulous attention to detail.",
  },
  {
    title: "Structure",
    description:
      "Tailored to perfection for the modern silhouette. We prioritize fit and structure in every design.",
  },
  {
    title: "Timelessness",
    description:
      "Fashion that transcends seasonal trends. Our pieces remain elegant and relevant for years to come.",
  },
  {
    title: "Exclusivity",
    description:
      "Limited production, maximum impact. Quality over volume, always. Each piece feels exclusive and intentional.",
  },
];

export default function ValuesGrid() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <ScrollReveal key={value.title} delay={i * 0.1}>
            <div className="glass-card p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,176,107,0.15)] hover:border-accent/20 group">
              {/* Gold diamond icon */}
              <div className="w-8 h-8 mb-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-accent drop-shadow-[0_0_6px_rgba(201,176,107,0.4)] group-hover:drop-shadow-[0_0_10px_rgba(201,176,107,0.6)] transition-all"
                >
                  <path
                    d="M12 2L22 12L12 22L2 12L12 2Z"
                    fill="currentColor"
                    fillOpacity="0.15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <h3 className="font-body text-lg font-medium mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

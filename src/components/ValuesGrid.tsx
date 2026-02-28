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
        {values.map((value) => (
          <div
            key={value.title}
            className="p-8 rounded-[20px] border border-border-subtle bg-white"
          >
            <h3 className="font-body text-lg font-medium mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

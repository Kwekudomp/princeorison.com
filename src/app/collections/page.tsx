import { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
  title: "Our Collections",
  description:
    "Browse all categories of premium African fashion from Prince Orison Fashion House. From structured agbadas to contemporary casual wear, explore our complete range.",
};

export default function CollectionsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="py-32 pt-40 px-[5%] bg-bg-surface text-center">
        <h1 className="font-display text-5xl md:text-6xl font-light">
          Our Collections
        </h1>
        <p className="text-text-secondary text-lg mt-6 max-w-2xl mx-auto">
          From structured agbadas to contemporary casual wear, explore our
          complete range of premium African fashion.
        </p>
      </section>

      {/* Collections grid */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col, i) => (
            <CollectionCard key={col.slug} collection={col} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { collections, getCollectionBySlug } from "@/data/collections";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection Not Found",
      description: "The requested collection could not be found.",
    };
  }

  return {
    title: collection.name,
    description: collection.heroDescription,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const hasProducts = collection.products.length > 0;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 pb-4 px-[5%]">
        <div className="max-w-[1400px] mx-auto text-sm text-text-secondary">
          <Link href="/" className="hover:text-accent transition">
            Home
          </Link>
          <span className="text-border-subtle"> / </span>
          <Link href="/collections" className="hover:text-accent transition">
            Collections
          </Link>
          <span className="text-border-subtle"> / </span>
          <span>{collection.name}</span>
        </div>
      </nav>

      {/* Hero banner */}
      <section className="py-16 px-[5%] bg-bg-surface text-center">
        <h1 className="font-display text-4xl md:text-5xl font-light">
          {collection.name}
        </h1>
        <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
          {collection.heroDescription}
        </p>
      </section>

      {/* Product grid */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          {hasProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collection.products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-3xl font-light text-text-secondary">
                Coming Soon
              </p>
              <p className="text-text-secondary mt-4">
                This collection is being curated. Contact us for inquiries.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        variant="dark"
        title="Ready to Order?"
        subtitle="Contact us to place your order or schedule a fitting consultation"
        secondaryHref="/collections"
        secondaryLabel="View Other Collections"
      />
    </>
  );
}

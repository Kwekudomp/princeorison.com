import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { collections as staticCollections, getCollectionBySlug } from "@/data/collections";
import { fetchCollections, fetchCollectionBySlug } from "@/lib/collections.service";
import { adaptCollection } from "@/lib/collections.adapter";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";

const useSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function generateStaticParams() {
  if (useSupabase) {
    try {
      const rows = await fetchCollections();
      if (rows.length > 0) return rows.map((c) => ({ slug: c.slug }));
    } catch {
      // fall through
    }
  }
  return staticCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let name = "";
  let description = "";

  if (useSupabase) {
    try {
      const row = await fetchCollectionBySlug(slug);
      if (row) {
        name = row.name;
        description = row.hero_description ?? "";
      }
    } catch {
      // fall through
    }
  }

  if (!name) {
    const col = getCollectionBySlug(slug);
    name = col?.name ?? "Collection";
    description = col?.heroDescription ?? "";
  }

  return { title: name, description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let collection = getCollectionBySlug(slug);

  if (useSupabase) {
    try {
      const row = await fetchCollectionBySlug(slug);
      if (row) collection = adaptCollection(row);
    } catch {
      // fall through to static
    }
  }

  if (!collection) notFound();

  const hasProducts = collection.products.length > 0;

  return (
    <>
      {/* Breadcrumb */}
      <nav className="pt-28 pb-4 px-[5%]">
        <div className="max-w-[1400px] mx-auto text-sm text-text-secondary">
          <Link href="/" className="hover:text-accent transition">Home</Link>
          <span className="text-border-subtle"> / </span>
          <Link href="/collections" className="hover:text-accent transition">Collections</Link>
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
                Bespoke — Enquire to Order
              </p>
              <p className="text-text-secondary mt-4">
                This collection is made to your exact specifications. Contact us
                to begin the consultation process.
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

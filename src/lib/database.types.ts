// Auto-generated type definitions for Prince Orison Supabase schema
// Re-generate with: npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          hero_description: string | null;
          cover_image: string | null;
          display_order: number;
          is_published: boolean;
          is_bespoke: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["collections"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["collections"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          collection_id: string;
          name: string;
          description: string | null;
          whatsapp_message: string | null;
          display_order: number;
          is_published: boolean;
          is_new_arrival: boolean;
          arrival_label: "New" | "Featured" | "Season" | "Limited";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      videos: {
        Row: {
          id: string;
          title: string;
          caption: string | null;
          storage_path: string;
          thumbnail_path: string | null;
          duration_seconds: number | null;
          category: "showcase" | "lookbook" | "behind-the-scenes" | "reel";
          display_order: number;
          is_published: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["videos"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["videos"]["Insert"]>;
      };
      product_features: {
        Row: {
          id: string;
          product_id: string;
          feature: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["product_features"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["product_features"]["Insert"]>;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string;
          alt_text: string | null;
          sort_order: number;
          is_cover: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["product_images"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["product_images"]["Insert"]>;
      };
      enquiries: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          collection_interest: string | null;
          event_type: "wedding" | "casual" | "formal" | "political" | "other" | null;
          event_date: string | null;
          message: string | null;
          status: "new" | "read" | "replied" | "closed";
          source: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["enquiries"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["newsletter_subscribers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
      };
    };
  };
}

// ── Convenience types ─────────────────────────────────────────
export type CollectionRow = Database["public"]["Tables"]["collections"]["Row"];
export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductImageRow = Database["public"]["Tables"]["product_images"]["Row"];
export type ProductFeatureRow = Database["public"]["Tables"]["product_features"]["Row"];
export type EnquiryRow = Database["public"]["Tables"]["enquiries"]["Row"];
export type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];
export type NewsletterRow = Database["public"]["Tables"]["newsletter_subscribers"]["Row"];
export type NewsletterInsert = Database["public"]["Tables"]["newsletter_subscribers"]["Insert"];
export type VideoRow = Database["public"]["Tables"]["videos"]["Row"];

// ── Joined type used by the frontend ─────────────────────────
export type CollectionWithProducts = CollectionRow & {
  products: (ProductRow & {
    features: ProductFeatureRow[];
    images: ProductImageRow[];
  })[];
};

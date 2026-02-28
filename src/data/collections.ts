export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  images: string[];
  whatsappMessage: string;
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  heroDescription: string;
  coverImage: string;
  products: Product[];
}

const WHATSAPP_NUMBER = "233245099930";

function whatsappMsg(productName: string): string {
  return `Hi, I'm interested in the ${productName}`;
}

export const collections: Collection[] = [
  // ──────────────────────────────────────────────
  // 1. KAFTAN (Casual)
  // ──────────────────────────────────────────────
  {
    slug: "kaftan-casual",
    name: "KAFTAN (Casual)",
    description: "Everyday kaftan wear with modern styling",
    heroDescription:
      "Discover our range of casual kaftans designed for the modern man. Each piece combines traditional silhouettes with contemporary tailoring, delivering effortless style for everyday occasions — from weekend outings to relaxed office settings.",
    coverImage: "/images/products/kaftan-casual/shirts-casual-1.jpeg",
    products: [
      {
        id: "kaftan-casual-1",
        name: "Classic Black Kaftan",
        description:
          "Sleek black casual kaftan with tailored trousers, perfect for refined everyday wear.",
        features: [
          "Premium black fabric with subtle sheen",
          "Tailored trousers included for a complete look",
          "Modern slim-cut silhouette",
          "Comfortable lightweight construction",
        ],
        images: ["/images/products/kaftan-casual/shirts-casual-1.jpeg"],
        whatsappMessage: whatsappMsg("Classic Black Kaftan"),
      },
      {
        id: "kaftan-casual-2",
        name: "Modern Colorblock Kaftan",
        description:
          "Bold white and black colorblock design that makes a contemporary statement.",
        features: [
          "Striking white and black colorblock pattern",
          "Clean modern lines with structured shoulders",
          "Breathable premium cotton blend",
          "Versatile styling for day or evening wear",
        ],
        images: ["/images/products/kaftan-casual/shirts-casual-2.jpeg"],
        whatsappMessage: whatsappMsg("Modern Colorblock Kaftan"),
      },
      {
        id: "kaftan-casual-3",
        name: "Heritage Striped Kaftan",
        description:
          "Black kaftan with multi-colored striped embroidery celebrating African heritage.",
        features: [
          "Hand-finished multi-colored striped embroidery",
          "Rich black base fabric for contrast",
          "Traditional-meets-modern design language",
          "Ideal for cultural events and celebrations",
        ],
        images: ["/images/products/kaftan-casual/shirts-casual-3.jpeg"],
        whatsappMessage: whatsappMsg("Heritage Striped Kaftan"),
      },
      {
        id: "kaftan-casual-4",
        name: "Executive Polo Set",
        description:
          "Classic green polo with matching trousers for a polished casual ensemble.",
        features: [
          "Rich green premium polo fabric",
          "Matching tailored trousers included",
          "Relaxed yet refined fit",
          "Perfect for smart-casual occasions",
        ],
        images: ["/images/products/kaftan-casual/shirts-casual-4.jpeg"],
        whatsappMessage: whatsappMsg("Executive Polo Set"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. POLITICAL SUIT
  // ──────────────────────────────────────────────
  {
    slug: "political-suit",
    name: "POLITICAL SUIT",
    description: "Refined political suiting for distinguished occasions",
    heroDescription:
      "Command presence with our distinguished political suit collection. Each suit is custom-made to your exact measurements, combining authoritative styling with supreme comfort for the boardroom, campaign trail, or state functions.",
    coverImage: "",
    products: [
      {
        id: "political-suit-1",
        name: "Classic Political Suit",
        description:
          "Custom-made political suit crafted for authority and comfort. Inquire for details and measurements.",
        features: [
          "Custom-made to your exact measurements",
          "Premium suiting fabric",
          "Inquire for available styles and colours",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Classic Political Suit"),
      },
      {
        id: "political-suit-2",
        name: "Executive Two-Piece",
        description:
          "Tailored executive two-piece political suit for formal and ceremonial occasions. Inquire for details.",
        features: [
          "Bespoke tailoring for a commanding silhouette",
          "Suitable for formal and ceremonial events",
          "Inquire for fabric options and customisation",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Executive Two-Piece"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. ANKARA BLENDS
  // ──────────────────────────────────────────────
  {
    slug: "ankara-blends",
    name: "ANKARA BLENDS",
    description: "Contemporary ankara fusion pieces",
    heroDescription:
      "Experience the vibrant energy of ankara reimagined for the modern wardrobe. Our ankara blend pieces fuse bold African prints with contemporary cuts, creating standout garments that bridge tradition and trend.",
    coverImage: "",
    products: [
      {
        id: "ankara-blends-1",
        name: "Modern Ankara Blend Shirt",
        description:
          "Contemporary shirt blending ankara prints with modern tailoring. Inquire for available prints and sizes.",
        features: [
          "Fusion of ankara print and contemporary cut",
          "Lightweight comfortable construction",
          "Inquire for available prints and customisation",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Modern Ankara Blend Shirt"),
      },
      {
        id: "ankara-blends-2",
        name: "Ankara Fusion Set",
        description:
          "Complete ankara fusion outfit pairing vibrant prints with clean modern lines. Inquire for details.",
        features: [
          "Coordinated set with matching pieces",
          "Bold print selection available",
          "Inquire for fabric options and sizing",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Ankara Fusion Set"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. AGBADA (3 Piece)
  // ──────────────────────────────────────────────
  {
    slug: "agbada-3-piece",
    name: "AGBADA (3 Piece)",
    description:
      "Structured 3-piece sets combining traditional elegance with modern tailoring",
    heroDescription:
      "Make a grand entrance with our meticulously crafted agbada three-piece sets. Each ensemble pairs the flowing grandeur of the traditional agbada with precision tailoring, delivering regal presence for weddings, celebrations, and milestone events.",
    coverImage: "/images/products/agbada-3-piece/kaftan-agbada-1.jpeg",
    products: [
      {
        id: "agbada-3-piece-1",
        name: "Royal Burgundy Agbada",
        description:
          "Elegant burgundy 3-piece agbada with intricate embellishments for a truly regal appearance.",
        features: [
          "Deep burgundy premium fabric",
          "Intricate hand-finished embellishments",
          "Complete 3-piece set with agbada, kaftan, and trousers",
          "Statement piece for weddings and celebrations",
        ],
        images: ["/images/products/agbada-3-piece/kaftan-agbada-1.jpeg"],
        whatsappMessage: whatsappMsg("Royal Burgundy Agbada"),
      },
      {
        id: "agbada-3-piece-2",
        name: "Celebration White Agbada",
        description:
          "Clean white 3-piece agbada with purple geometric embroidery for standout elegance.",
        features: [
          "Pristine white base fabric",
          "Purple geometric embroidery detail",
          "Full 3-piece ensemble included",
          "Perfect for milestone celebrations and ceremonies",
        ],
        images: ["/images/products/agbada-3-piece/kaftan-agbada-2.jpeg"],
        whatsappMessage: whatsappMsg("Celebration White Agbada"),
      },
      {
        id: "agbada-3-piece-3",
        name: "Heritage Kente Agbada",
        description:
          "Contemporary white agbada with kente-inspired embellishments honouring Ghanaian heritage.",
        features: [
          "White fabric with kente-inspired embellishments",
          "Contemporary interpretation of traditional motifs",
          "Complete 3-piece agbada set",
          "Celebrates Ghanaian craftsmanship and heritage",
        ],
        images: ["/images/products/agbada-3-piece/kaftan-agbada-3.jpeg"],
        whatsappMessage: whatsappMsg("Heritage Kente Agbada"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. RTW COLLECTION
  // ──────────────────────────────────────────────
  {
    slug: "rtw-collection",
    name: "RTW COLLECTION",
    description: "Ready-to-wear pieces available in showroom",
    heroDescription:
      "Explore our curated ready-to-wear collection — designed, cut, and finished to perfection so you can walk in and walk out in style. Each piece captures the Prince Orison signature of elegance and is available for immediate purchase in our showroom.",
    coverImage: "/images/products/rtw-collection/womens-collection-1.jpeg",
    products: [
      {
        id: "rtw-collection-1",
        name: "Elegant Statement Piece",
        description:
          "Sophisticated design capturing feminine elegance with bold structural details.",
        features: [
          "Striking silhouette with architectural draping",
          "Premium fabric with luxurious finish",
          "Ready-to-wear — available in showroom",
          "Designed for formal and evening occasions",
        ],
        images: ["/images/products/rtw-collection/womens-collection-1.jpeg"],
        whatsappMessage: whatsappMsg("Elegant Statement Piece"),
      },
      {
        id: "rtw-collection-2",
        name: "Contemporary Classic",
        description:
          "Timeless design with modern sensibility, blending clean lines with feminine grace.",
        features: [
          "Timeless silhouette with modern proportions",
          "Soft premium fabric for all-day comfort",
          "Ready-to-wear — available in showroom",
          "Versatile for day-to-evening transition",
        ],
        images: ["/images/products/rtw-collection/womens-collection-2.jpeg"],
        whatsappMessage: whatsappMsg("Contemporary Classic"),
      },
      {
        id: "rtw-collection-3",
        name: "Signature Elegance",
        description:
          "A celebration of feminine power and style, crafted with meticulous attention to detail.",
        features: [
          "Bold design celebrating feminine strength",
          "Meticulous hand-finished details",
          "Ready-to-wear — available in showroom",
          "Statement piece for special occasions",
        ],
        images: ["/images/products/rtw-collection/womens-collection-3.jpeg"],
        whatsappMessage: whatsappMsg("Signature Elegance"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. CASUAL
  // ──────────────────────────────────────────────
  {
    slug: "casual",
    name: "CASUAL",
    description: "Casual everyday wear for the modern professional",
    heroDescription:
      "Elevate your off-duty wardrobe with our casual collection. From perfectly tailored trousers to premium shorts, each piece is designed for the modern professional who values comfort without compromising on style.",
    coverImage: "/images/products/casual/trousers-shorts-1.jpeg",
    products: [
      {
        id: "casual-1",
        name: "Classic Tailored Fits",
        description:
          "Perfectly tailored trousers for the discerning professional who demands both style and comfort.",
        features: [
          "Premium fabric with tailored fit",
          "Clean lines and refined finishing",
          "Comfortable stretch for all-day wear",
          "Ideal for smart-casual and office settings",
        ],
        images: ["/images/products/casual/trousers-shorts-1.jpeg"],
        whatsappMessage: whatsappMsg("Classic Tailored Fits"),
      },
      {
        id: "casual-2",
        name: "Contemporary Dress Trousers",
        description:
          "Refined contemporary cut with premium finishing for a polished everyday look.",
        features: [
          "Contemporary slim-cut silhouette",
          "Premium finishing and stitching",
          "Versatile enough for office or evening",
          "Available in multiple colourways",
        ],
        images: ["/images/products/casual/trousers-shorts-2.jpeg"],
        whatsappMessage: whatsappMsg("Contemporary Dress Trousers"),
      },
      {
        id: "casual-3",
        name: "Executive Casual Shorts",
        description:
          "Premium casual shorts with a tailored fit, perfect for warm-weather sophistication.",
        features: [
          "Premium casual fabric with tailored fit",
          "Clean hemline and structured waistband",
          "Breathable construction for warm weather",
          "Pairs perfectly with polo or linen shirt",
        ],
        images: ["/images/products/casual/trousers-shorts-3.jpeg"],
        whatsappMessage: whatsappMsg("Executive Casual Shorts"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. GROOMSMAN/GROOMSWEAR
  // ──────────────────────────────────────────────
  {
    slug: "groomsman-groomswear",
    name: "GROOMSMAN/GROOMSWEAR",
    description: "Coordinated wedding and groomsmen collections",
    heroDescription:
      "Make your wedding day unforgettable with our coordinated groomsmen and groomswear collections. We work closely with you to design matching ensembles that complement the wedding theme while ensuring every member of the party looks impeccable.",
    coverImage: "",
    products: [
      {
        id: "groomsman-groomswear-1",
        name: "Groomsmen Package",
        description:
          "Coordinated groomsmen outfits tailored to match your wedding theme. Inquire for details and group pricing.",
        features: [
          "Coordinated outfits for the entire groomsmen party",
          "Customisable to match your wedding colours",
          "Inquire for group pricing and fabric options",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Groomsmen Package"),
      },
      {
        id: "groomsman-groomswear-2",
        name: "Wedding Party Set",
        description:
          "Complete wedding party set designed for a cohesive and elegant bridal party look. Inquire for details.",
        features: [
          "Full wedding party coordination available",
          "Premium fabrics and bespoke tailoring",
          "Inquire for consultation and customisation",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Wedding Party Set"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. KAFTAN (Masterpiece)
  // ──────────────────────────────────────────────
  {
    slug: "kaftan-masterpiece",
    name: "KAFTAN (Masterpiece)",
    description: "Premium statement kaftans for special occasions",
    heroDescription:
      "Our Masterpiece kaftans represent the pinnacle of Prince Orison craftsmanship. Each garment is a work of art — featuring hand-finished embellishments, premium fabrics, and designs that command attention at the most prestigious events.",
    coverImage: "",
    products: [
      {
        id: "kaftan-masterpiece-1",
        name: "Grand Masterpiece Kaftan",
        description:
          "An extraordinary statement kaftan with elaborate hand-finished details. Inquire for details and customisation.",
        features: [
          "Elaborate hand-finished embellishments",
          "Premium heavyweight fabric",
          "Inquire for available designs and customisation",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Grand Masterpiece Kaftan"),
      },
      {
        id: "kaftan-masterpiece-2",
        name: "Royal Statement Kaftan",
        description:
          "A regal statement kaftan designed for the most distinguished occasions. Inquire for details.",
        features: [
          "Regal design with luxurious embroidery",
          "Crafted for milestone celebrations",
          "Inquire for fabric selection and bespoke options",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Royal Statement Kaftan"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 9. JALABIYA (Custom)
  // ──────────────────────────────────────────────
  {
    slug: "jalabiya-custom",
    name: "JALABIYA (Custom)",
    description: "Custom jalabiya designs crafted to your specifications",
    heroDescription:
      "Experience the flowing elegance of our custom jalabiya collection. Each piece is crafted to your exact specifications — from fabric selection to embroidery details — ensuring a garment that is uniquely yours.",
    coverImage: "",
    products: [
      {
        id: "jalabiya-custom-1",
        name: "Classic Custom Jalabiya",
        description:
          "A timeless custom jalabiya tailored to your measurements and style preferences. Inquire for details.",
        features: [
          "Custom-made to your measurements",
          "Wide range of fabric choices available",
          "Inquire for design options and pricing",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Classic Custom Jalabiya"),
      },
      {
        id: "jalabiya-custom-2",
        name: "Premium Embroidered Jalabiya",
        description:
          "Luxurious jalabiya with premium embroidery crafted to your specifications. Inquire for details.",
        features: [
          "Premium embroidery and detailing",
          "Bespoke design consultation included",
          "Inquire for embroidery styles and fabric options",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Premium Embroidered Jalabiya"),
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 10. KAFTAN JACKET (3 Piece)
  // ──────────────────────────────────────────────
  {
    slug: "kaftan-jacket-3-piece",
    name: "KAFTAN JACKET (3 Piece)",
    description: "3-piece sleeveless kaftan jacket sets",
    heroDescription:
      "Redefine traditional style with our sleeveless kaftan jacket three-piece sets. These structured ensembles layer a sleeveless jacket over a kaftan and trousers, creating a contemporary silhouette that stands out at any event.",
    coverImage: "",
    products: [
      {
        id: "kaftan-jacket-3-piece-1",
        name: "Classic Kaftan Jacket Set",
        description:
          "Structured 3-piece kaftan jacket set with a sleeveless outer layer. Inquire for details and customisation.",
        features: [
          "Sleeveless jacket with structured shoulders",
          "Complete 3-piece set included",
          "Inquire for fabric and colour options",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Classic Kaftan Jacket Set"),
      },
      {
        id: "kaftan-jacket-3-piece-2",
        name: "Modern Sleeveless Three-Piece",
        description:
          "Contemporary take on the kaftan jacket set with clean modern lines. Inquire for details.",
        features: [
          "Modern cut with clean contemporary lines",
          "Lightweight layered construction",
          "Inquire for available styles and bespoke options",
        ],
        images: [],
        whatsappMessage: whatsappMsg("Modern Sleeveless Three-Piece"),
      },
    ],
  },
];

/**
 * Look up a collection by its URL slug.
 */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export type Category =
  | "Men's Perfume"
  | "Women's Perfume"
  | "Unisex"
  | "Arabic Perfume"
  | "Attar"
  | "Gift Sets";

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  size: string;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  notes: FragranceNotes;
  images: string[];
  badge?: string;
  stock: number;
  reviews: Review[];
}

export const CATEGORIES: { name: Category; description: string; icon: string }[] = [
  { name: "Men's Perfume", description: "Bold, woody and charismatic", icon: "men" },
  { name: "Women's Perfume", description: "Floral, elegant and timeless", icon: "women" },
  { name: "Unisex", description: "Boundless scents for all", icon: "unisex" },
  { name: "Arabic Perfume", description: "Rich oud and oriental warmth", icon: "arabic" },
  { name: "Attar", description: "Pure, alcohol-free oils", icon: "attar" },
  { name: "Gift Sets", description: "Curated luxury gifting", icon: "gift" },
];

const reviewBank: Review[] = [
  { id: "r1", name: "Aaliyah R.", rating: 5, date: "2 weeks ago", title: "Absolutely mesmerizing", body: "The longevity is unreal — I get compliments all day. Worth every penny." },
  { id: "r2", name: "Daniel K.", rating: 5, date: "1 month ago", title: "My new signature scent", body: "Sophisticated and warm. The dry-down is gorgeous on skin." },
  { id: "r3", name: "Sofia M.", rating: 4, date: "1 month ago", title: "Beautiful but pricey", body: "Smells divine and lasts hours. Wish it came in a smaller size for travel." },
  { id: "r4", name: "Omar F.", rating: 5, date: "2 months ago", title: "Pure luxury", body: "The packaging alone feels like a gift. The fragrance is deep and refined." },
  { id: "r5", name: "Hana L.", rating: 5, date: "3 months ago", title: "Heavenly", body: "I've never had a perfume turn so many heads. Already on my second bottle." },
  { id: "r6", name: "Marcus T.", rating: 4, date: "3 months ago", title: "Great projection", body: "Projects well without being overpowering. A refined evening scent." },
];

function pickReviews(seed: number, count: number): Review[] {
  const out: Review[] = [];
  for (let i = 0; i < count; i++) {
    out.push(reviewBank[(seed + i) % reviewBank.length]);
  }
  return out;
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "noir-imperial",
    name: "Noir Imperial",
    brand: "Zoyan Maison",
    category: "Men's Perfume",
    price: 189,
    originalPrice: 240,
    size: "100ml",
    rating: 4.9,
    reviewCount: 214,
    description: "A commanding woody-aromatic fragrance built on smoky oud, leather and amber. Noir Imperial opens with a burst of bergamot and black pepper before settling into a deep, magnetic warmth.",
    story: "Inspired by the quiet confidence of midnight in the city, Noir Imperial was composed over two years by our master perfumer to capture the essence of understated power.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Pink Pepper"],
      middle: ["Oud", "Saffron", "Rose"],
      base: ["Leather", "Amber", "Patchouli"],
    },
    images: [
      "https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/11417443/pexels-photo-11417443.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/16239693/pexels-photo-16239693.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "Bestseller",
    stock: 32,
    reviews: pickReviews(0, 4),
  },
  {
    id: "p2",
    slug: "rose-eternelle",
    name: "Rose Éternelle",
    brand: "Zoyan Maison",
    category: "Women's Perfume",
    price: 165,
    size: "90ml",
    rating: 4.8,
    reviewCount: 187,
    description: "A luminous floral built on Damask rose and peony, softened by white musk and vanilla. Romantic, radiant and endlessly feminine.",
    story: "Each bottle contains the essence of over 4,000 hand-picked Damask roses, harvested at dawn in the Valley of Roses.",
    notes: {
      top: ["Pink Pepper", "Lychee", "Bergamot"],
      middle: ["Damask Rose", "Peony", "Jasmine"],
      base: ["White Musk", "Vanilla", "Sandalwood"],
    },
    images: [
      "https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/21308575/pexels-photo-21308575.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/4110341/pexels-photo-4110341.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "New",
    stock: 48,
    reviews: pickReviews(1, 4),
  },
  {
    id: "p3",
    slug: "oud-royale",
    name: "Oud Royale",
    brand: "Zoyan Maison",
    category: "Arabic Perfume",
    price: 245,
    originalPrice: 290,
    size: "75ml",
    rating: 5.0,
    reviewCount: 142,
    description: "An opulent oriental oud layered with saffron, rose and amber. Deep, resinous and unforgettable — the crown jewel of our oriental collection.",
    story: "Crafted with aged Cambodian oud, Oud Royale pays homage to the ancient art of Arabian perfumery passed down through generations.",
    notes: {
      top: ["Saffron", "Cardamom"],
      middle: ["Cambodian Oud", "Taif Rose"],
      base: ["Amber", "Musk", "Incense"],
    },
    images: [
      "https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/11482468/pexels-photo-11482468.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/10786706/pexels-photo-10786706.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "Limited",
    stock: 18,
    reviews: pickReviews(2, 4),
  },
  {
    id: "p4",
    slug: "velvet-musk",
    name: "Velvet Musk",
    brand: "Zoyan Maison",
    category: "Unisex",
    price: 145,
    size: "100ml",
    rating: 4.7,
    reviewCount: 96,
    description: "A soft, second-skin musk with cashmeran, iris and a whisper of amber. Clean, intimate and effortlessly modern.",
    story: "Designed to be worn by anyone, Velvet Musk is a study in restraint — a fragrance that lingers close and never shouts.",
    notes: {
      top: ["Iris", "Violet Leaf"],
      middle: ["Cashmeran", "Orris"],
      base: ["White Musk", "Amber", "Cedar"],
    },
    images: [
      "https://images.pexels.com/photos/12402366/pexels-photo-12402366.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/7364096/pexels-photo-7364096.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/16266295/pexels-photo-16266295.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    stock: 64,
    reviews: pickReviews(3, 3),
  },
  {
    id: "p5",
    slug: "amber-saffron-attar",
    name: "Amber Saffron Attar",
    brand: "Zoyan Maison",
    category: "Attar",
    price: 210,
    size: "12ml",
    rating: 4.9,
    reviewCount: 73,
    description: "A pure, alcohol-free concentrated oil blending amber, saffron and sandalwood. A single drop lasts all day.",
    story: "Traditional attar distillation, slow-cured in sandalwood oil for six months to achieve its signature depth.",
    notes: {
      top: ["Saffron"],
      middle: ["Amber", "Rose"],
      base: ["Sandalwood", "Musk"],
    },
    images: [
      "https://images.pexels.com/photos/30981935/pexels-photo-30981935.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/38721545/pexels-photo-38721545.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/38721543/pexels-photo-38721543.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "Pure Oil",
    stock: 26,
    reviews: pickReviews(4, 3),
  },
  {
    id: "p6",
    slug: "lumiere-dor",
    name: "Lumière d'Or",
    brand: "Zoyan Maison",
    category: "Women's Perfume",
    price: 175,
    size: "90ml",
    rating: 4.8,
    reviewCount: 134,
    description: "A radiant floral-oriental with ylang-ylang, tuberose and golden amber. Glowing, sensual and unforgettable.",
    story: "Named for the golden hour, Lumière d'Or captures the warm light that bathes everything in gold just before sunset.",
    notes: {
      top: ["Ylang-Ylang", "Mandarin"],
      middle: ["Tuberose", "Orange Blossom"],
      base: ["Golden Amber", "Benzoin", "Sandalwood"],
    },
    images: [
      "https://images.pexels.com/photos/37468240/pexels-photo-37468240.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/8625543/pexels-photo-8625543.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/11711808/pexels-photo-11711808.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    stock: 41,
    reviews: pickReviews(5, 3),
  },
  {
    id: "p7",
    slug: "bleu-midnight",
    name: "Bleu Midnight",
    brand: "Zoyan Maison",
    category: "Men's Perfume",
    price: 198,
    size: "100ml",
    rating: 4.7,
    reviewCount: 168,
    description: "A fresh yet deep aromatic fougère with grapefruit, lavender and vetiver. Crisp by day, magnetic by night.",
    story: "Bleu Midnight was born from the contrast between cool air and warm skin — a fragrance of quiet intensity.",
    notes: {
      top: ["Grapefruit", "Mint", "Bergamot"],
      middle: ["Lavender", "Geranium", "Nutmeg"],
      base: ["Vetiver", "Cedar", "Tonka Bean"],
    },
    images: [
      "https://images.pexels.com/photos/6945831/pexels-photo-6945831.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/10629797/pexels-photo-10629797.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    stock: 55,
    reviews: pickReviews(0, 3),
  },
  {
    id: "p8",
    slug: "myst-oud",
    name: "Myst Oud",
    brand: "Zoyan Maison",
    category: "Arabic Perfume",
    price: 225,
    size: "75ml",
    rating: 4.9,
    reviewCount: 88,
    description: "A mysterious blend of smoky oud, citrus and warm spices. Enigmatic and deeply addictive.",
    story: "Myst Oud was composed to evoke the haze of incense rising in an ancient temple at dusk.",
    notes: {
      top: ["Citrus", "Pink Pepper"],
      middle: ["Oud", "Rose", "Cinnamon"],
      base: ["Amber", "Labdanum", "Musk"],
    },
    images: [
      "https://images.pexels.com/photos/35658144/pexels-photo-35658144.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/35806942/pexels-photo-35806942.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/36389331/pexels-photo-36389331.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    stock: 22,
    reviews: pickReviews(2, 3),
  },
  {
    id: "p9",
    slug: "petale-noir",
    name: "Pétale Noir",
    brand: "Zoyan Maison",
    category: "Women's Perfume",
    price: 158,
    originalPrice: 190,
    size: "90ml",
    rating: 4.6,
    reviewCount: 112,
    description: "A dark floral of black rose, plum and incense. Mysterious, gothic and utterly seductive.",
    story: "Pétale Noir is the rose after midnight — deeper, sweeter and shadowed by smoke.",
    notes: {
      top: ["Plum", "Pink Pepper"],
      middle: ["Black Rose", "Iris"],
      base: ["Incense", "Vanilla", "Patchouli"],
    },
    images: [
      "https://images.pexels.com/photos/21008941/pexels-photo-21008941.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/13875783/pexels-photo-13875783.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/8624586/pexels-photo-8624586.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "Sale",
    stock: 38,
    reviews: pickReviews(3, 3),
  },
  {
    id: "p10",
    slug: "zoyan-heritage-set",
    name: "Zoyan Heritage Gift Set",
    brand: "Zoyan Maison",
    category: "Gift Sets",
    price: 320,
    originalPrice: 380,
    size: "3 x 30ml",
    rating: 5.0,
    reviewCount: 64,
    description: "A curated trio of our most beloved fragrances in 30ml flacons, presented in a hand-finished lacquered box. The ultimate introduction to Zoyan.",
    story: "The Heritage Set celebrates three pillars of the house — one floral, one oriental, one woody — for the connoisseur who cannot choose just one.",
    notes: {
      top: ["Bergamot", "Saffron", "Pink Pepper"],
      middle: ["Rose", "Oud", "Tuberose"],
      base: ["Amber", "Musk", "Sandalwood"],
    },
    images: [
      "https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/8624586/pexels-photo-8624586.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/13800890/pexels-photo-13800890.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "Gift",
    stock: 14,
    reviews: pickReviews(1, 3),
  },
  {
    id: "p11",
    slug: "santal-pur",
    name: "Santal Pur",
    brand: "Zoyan Maison",
    category: "Unisex",
    price: 185,
    size: "100ml",
    rating: 4.8,
    reviewCount: 91,
    description: "A creamy, meditative sandalwood with cardamom and fig. Calm, grounding and quietly luxurious.",
    story: "Santal Pur is an ode to stillness — the scent of a quiet morning ritual before the world wakes.",
    notes: {
      top: ["Cardamom", "Fig Leaf"],
      middle: ["Sandalwood", "Iris"],
      base: ["Cedar", "Vetiver", "Musk"],
    },
    images: [
      "https://images.pexels.com/photos/7005940/pexels-photo-7005940.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/34690231/pexels-photo-34690231.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/16038072/pexels-photo-16038072.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    stock: 47,
    reviews: pickReviews(4, 3),
  },
  {
    id: "p12",
    slug: "rose-oud-attar",
    name: "Rose Oud Attar",
    brand: "Zoyan Maison",
    category: "Attar",
    price: 235,
    size: "12ml",
    rating: 4.9,
    reviewCount: 57,
    description: "A precious concentrated oil of rose and oud, aged in sandalwood. Intense, romantic and long-lasting.",
    story: "Two of perfumery's most prized materials, married in a single drop of pure oil.",
    notes: {
      top: ["Saffron"],
      middle: ["Rose", "Oud"],
      base: ["Sandalwood", "Amber"],
    },
    images: [
      "https://images.pexels.com/photos/36389334/pexels-photo-36389334.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/38721543/pexels-photo-38721543.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
      "https://images.pexels.com/photos/30981935/pexels-photo-30981935.jpeg?auto=compress&cs=tinysrgb&h=900&w=700",
    ],
    badge: "Pure Oil",
    stock: 19,
    reviews: pickReviews(5, 3),
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

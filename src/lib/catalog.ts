export type ProductColor = {
  name: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  colors: ProductColor[];
  imagePosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  tagline: string;
  description: string;
  dimensions?: string;
  materials?: string;
  care?: string;
};

export const categories = [
  "All pieces",
  "Handbags",
  "Shoulder Bags",
  "Tote Bags",
  "Crossbody Bags",
  "Clutches",
];

export const products: Product[] = [
  {
    slug: "the-muse-handbag",
    name: "The Muse Handbag",
    category: "Handbags",
    price: 4890,
    colors: [
      { name: "Burgundy", value: "#641f31" },
      { name: "Espresso", value: "#3b2924" },
      { name: "Rose", value: "#bd8790" },
    ],
    imagePosition: "top-left",
    tagline: "A considered classic for the everyday edit.",
    description:
      "A structured concept with a softly tailored silhouette, designed to hold the things you reach for most.",
    dimensions: "Details coming soon",
    materials: "Leather-like concept finish; final material details coming soon",
    care: "Care guidance coming soon",
  },
  {
    slug: "the-luna-shoulder-bag",
    name: "The Luna Shoulder Bag",
    category: "Shoulder Bags",
    price: 4290,
    colors: [
      { name: "Espresso", value: "#3b2924" },
      { name: "Burgundy", value: "#641f31" },
    ],
    imagePosition: "top-right",
    tagline: "Soft shape, polished finish, made to move.",
    description:
      "A relaxed shoulder bag concept with a sculpted curve and an easy profile for day-to-evening styling.",
    dimensions: "Details coming soon",
    materials: "Leather-like concept finish; final material details coming soon",
    care: "Care guidance coming soon",
  },
  {
    slug: "the-bloom-tote",
    name: "The Bloom Tote",
    category: "Tote Bags",
    price: 3790,
    colors: [
      { name: "Rose", value: "#bd8790" },
      { name: "Ivory", value: "#e8ddd0" },
    ],
    imagePosition: "bottom-left",
    tagline: "Room for the rituals that make a day yours.",
    description:
      "A generous tote concept for full days, long lists, and every beautiful in-between.",
    dimensions: "Details coming soon",
    materials: "Leather-like concept finish; final material details coming soon",
    care: "Care guidance coming soon",
  },
  {
    slug: "the-pearl-clutch",
    name: "The Pearl Clutch",
    category: "Clutches",
    price: 2890,
    colors: [
      { name: "Ivory", value: "#e8ddd0" },
      { name: "Rose", value: "#bd8790" },
    ],
    imagePosition: "bottom-right",
    tagline: "A little glow for the after-hours.",
    description:
      "A softly gathered clutch concept finished with a sculptural clasp and a quiet evening presence.",
    dimensions: "Details coming soon",
    materials: "Textured concept finish; final material details coming soon",
    care: "Care guidance coming soon",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
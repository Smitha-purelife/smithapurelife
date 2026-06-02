export interface ProductSize {
  size: string;
  price: number;
  originalPrice: number;
}

export interface ProductIngredient {
  name: string;
  effect: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  lifestyleImage: string;
  additionalImage?: string;
  hasFullBanner?: boolean;
  texture: string;
  accent: string;
  bg: string;
  benefits: string[];
  ingredients: ProductIngredient[];
  results: string;
  sizes: ProductSize[];
  category: 'haircare' | 'accessories';
}

export const products: Product[] = [
  {
    id: "avosilk-bloom",
    title: "Avosilky Bloom",
    subtitle: "Avocado Hair Treatment",
    description: "Nourish your hair with the rich goodness of Avocado. Designed for deep conditioning and silken texture.",
    image: "/products/avosilk_bloom.png",
    lifestyleImage: "/products/media__1779362724448.png",
    additionalImage: "/products/avosilk_bloom_benefits.png",
    hasFullBanner: true,
    texture: "/products/avosilk_bloom_texture.png",
    accent: "#E9D5CA",
    bg: "#FDF9F6",
    benefits: ["Deep Conditioning", "Silken Texture", "Vitamin E Rich"],
    ingredients: [
      { name: "Cold-Pressed Avocado Oil", effect: "Deep hydration and fatty acid replenishment" },
      { name: "Organic Shea Butter", effect: "Seals moisture and prevents breakage" },
      { name: "Vitamin E", effect: "Antioxidant protection for hair follicles" }
    ],
    results: "Visible silken texture and reduced frizz within 3 uses. 95% of users reported deeper conditioning.",
    sizes: [
      { size: "50ml", price: 650, originalPrice: 799 },
      { size: "100ml", price: 1200, originalPrice: 1499 }
    ],
    category: 'haircare'
  },
  {
    id: "radiance-oil",
    title: "Radiance Hair Oil",
    subtitle: "Growth Revival Formula",
    description: "2x Advance Growth Revival. Infused with Jojoba, Rosemary, and 20+ botanical extracts for intensive rescue.",
    image: "/products/herbal_radiance_hair_oil.png",
    lifestyleImage: "/products/media__1779362732647.png",
    additionalImage: "/products/radiance_oil_benefits.png",
    hasFullBanner: true,
    texture: "/products/radiance_oil_texture.png",
    accent: "#F9F3CC",
    bg: "#FFFBEB",
    benefits: ["Intensive Rescue", ["Advance Growth"][0], "Natural Shine"],
    ingredients: [
      { name: "Rosemary Extract", effect: "Stimulates scalp circulation for growth" },
      { name: "Golden Jojoba Oil", effect: "Mimics natural scalp oils for balance" },
      { name: "Castor Oil", effect: "Thickens hair strands and strengthens roots" }
    ],
    results: "80% reduction in hair fall and noticeable regrowth in thinning areas after 4 weeks.",
    sizes: [
      { size: "50ml", price: 850, originalPrice: 999 },
      { size: "100ml", price: 1450, originalPrice: 1699 }
    ],
    category: 'haircare'
  },
  {
    id: "herbal-wash",
    title: "Herbal Hair Wash",
    subtitle: "Pure Therapy Powder",
    description: "Nature's therapy in a powder. A traditional blend of Amla and Hibiscus for a pure, herbal cleanse.",
    image: "/products/hair_wash_powder_v2.png",
    lifestyleImage: "/products/herbal_wash_hero_v2_png_1778593690717.png",
    additionalImage: "/products/herbal_wash_benefits.png",
    texture: "/products/herbal_wash_texture.png",
    accent: "#D4E2D4",
    bg: "#F0F7F0",
    benefits: ["Herbal Cleanse", "Scalp Health", "Traditional Blend"],
    ingredients: [
      { name: "Amla (Gooseberry)", effect: "Natural cleanser and source of Vitamin C" },
      { name: "Hibiscus Petals", effect: "Conditions hair and prevents premature graying" },
      { name: "Soapnut (Reetha)", effect: "Gentle natural lather without sulfates" }
    ],
    results: "A balanced, healthy scalp and natural shine. Free from chemical buildup.",
    sizes: [
      { size: "70gm", price: 550, originalPrice: 699 },
      { size: "270gm", price: 999, originalPrice: 1199 }
    ],
    category: 'haircare'
  },
  {
    id: "pro-repair-serum",
    title: "Pro Repair Serum",
    subtitle: "Silk Gloss Technology",
    description: "Instant silk gloss with botanical repair technology. Restore natural vitality and overnight repair.",
    image: "/products/silk_gloss_pro_repair_serum.png",
    lifestyleImage: "/products/pro_repair_serum_hero_v2_png_1778593726696.png",
    additionalImage: "/products/pro_repair_serum_benefits.png",
    texture: "/products/pro_repair_texture.png",
    accent: "#DBCDF0",
    bg: "#F5F0FA",
    benefits: ["Instant Gloss", "Overnight Repair", "Botanical Tech"],
    ingredients: [
      { name: "Argan Oil", effect: "Instant shine and heat protection" },
      { name: "Marshmallow Root", effect: "Provides slip and detangles instantly" },
      { name: "Keratin Protein", effect: "Fills in hair cuticle damage" }
    ],
    results: "Immediate 70% increase in gloss and 2x easier detangling.",
    sizes: [
      { size: "30ml", price: 690, originalPrice: 790 },
      { size: "50ml", price: 1150, originalPrice: 1350 }
    ],
    category: 'haircare'
  },
  {
    id: "follicra-regrowth",
    title: "Follicra Regrowth",
    subtitle: "Advanced Scalp Ritual",
    description: "Advanced hair regrowth therapy featuring Marshmallow root and Ayurvedic botanicals.",
    image: "/products/follicra_proper.jpg",
    lifestyleImage: "/products/follicra_regrowth_hero.png",
    additionalImage: "/products/follicra_regrowth_benefits.png",
    texture: "/products/follicra_regrowth_texture.png",
    accent: "#DDF1E9",
    bg: "#F2FAF7",
    benefits: ["Regrowth Therapy", "Ayurvedic Blend", "Root Strength"],
    ingredients: [
      { name: "Marshmallow Root", effect: "Soothes scalp irritation" },
      { name: "Bhringraj", effect: "The king of herbs for hair regrowth" },
      { name: "Black Cumin Seed", effect: "Prevents hair thinning and scalp infections" }
    ],
    results: "Clinically proven to increase hair density by 15% over 3 months.",
    sizes: [
      { size: "30ml", price: 1100, originalPrice: 1299 },
      { size: "50ml", price: 1800, originalPrice: 2099 }
    ],
    category: 'haircare'
  },
  {
    id: "satin-pillowcase",
    title: "Satin Pillowcase",
    subtitle: "Premium Silk Slumber",
    description: "Luxurious satin pillowcases designed for hair fall control, frizz-free hair, glowing skin, and better sleep.",
    image: "/products/satin_pillowcase_proper.jpg",
    lifestyleImage: "/products/satin_pillowcase_proper.jpg",
    additionalImage: "/products/satin_pillowcase_proper.jpg",
    texture: "/products/bubbles.png",
    accent: "#E5C2C0",
    bg: "#FAF3EE",
    benefits: ["Hair Fall Control", "Frizz Free & Smooth", "Glowing Skin", "Anti Wrinkle", "Better Sleep"],
    ingredients: [
      { name: "Premium Satin Silk", effect: "Reduces friction on hair and skin cuticles" },
      { name: "Hypoallergenic Fabric", effect: "Prevents dust mites and skin irritation" },
      { name: "Breathable Weave", effect: "Regulates temperature for deeper sleep" }
    ],
    results: "90% of users noticed smoother hair and reduced morning skin creases in 1 week.",
    sizes: [
      { size: "1 Unit", price: 799, originalPrice: 999 },
      { size: "Set of 2", price: 1499, originalPrice: 1899 }
    ],
    category: 'accessories'
  },
  {
    id: "satin-scrunchies",
    title: "Satin Scrunchies",
    subtitle: "Gentle Anti-Crease Grip",
    description: "Ultra-gentle satin scrunchies that prevent hair breakage and creasing while maintaining styles smoothly.",
    image: "/products/satin_scrunchies_proper.jpg",
    lifestyleImage: "/products/satin_scrunchies_proper.jpg",
    additionalImage: "/products/satin_scrunchies_proper.jpg",
    texture: "/products/bubbles.png",
    accent: "#DCD0C0",
    bg: "#FAF9F5",
    benefits: ["Hair Fall Control", "Frizz Free & Smooth", "Glowing Skin", "Better Sleep"],
    ingredients: [
      { name: "Pure Satin Fabric", effect: "Smooth slip preventing creasing and pulling" },
      { name: "Durable Elastic Core", effect: "Gentle hold without causing tension headaches" }
    ],
    results: "Zero morning creasing and maximum style protection overnight.",
    sizes: [
      { size: "Set of 3", price: 199, originalPrice: 299 },
      { size: "Set of 5", price: 299, originalPrice: 399 }
    ],
    category: 'accessories'
  }
];

export interface Combo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  includedProducts: string[];
  comboPrice: number;
  originalTotal: number;
  savings: number;
  badge: string;
  bg: string;
  accent: string;
}

export const comboProducts: Combo[] = [
  {
    id: "haircare-trio",
    title: "Haircare Trio",
    subtitle: "Wash + Oil + Conditioner",
    description: "The ultimate haircare trio — cleanse with Nature's Therapy, nourish with Herbal Radiance Oil, and seal with Avosilky Bloom conditioner.",
    image: "/products/media__1779362732647.png",
    includedProducts: ["herbal-wash", "radiance-oil", "avosilk-bloom"],
    comboPrice: 799,
    originalTotal: 930,
    savings: 131,
    badge: "Most Popular",
    bg: "#F0F7F0",
    accent: "#2D7A3A"
  },
  {
    id: "regrowth-power-pack",
    title: "Regrowth Power Pack",
    subtitle: "Oil + Follicra Serum",
    description: "Intensive regrowth duo — Herbal Radiance Oil to strengthen roots plus Follicra serum for advanced hair regrowth therapy.",
    image: "/products/follicra_proper.jpg",
    includedProducts: ["radiance-oil", "follicra-regrowth"],
    comboPrice: 899,
    originalTotal: 948,
    savings: 49,
    badge: "Growth Booster",
    bg: "#F2FAF7",
    accent: "#1A5B4B"
  },
  {
    id: "silk-repair-combo",
    title: "Silk & Repair Combo",
    subtitle: "Pro Repair Serum + Conditioner",
    description: "Instant silk gloss and deep conditioning — Pro Repair Serum for shine plus Avosilky Bloom for lasting softness.",
    image: "/products/pro_repair_serum_hero_v2_png_1778593726696.png",
    includedProducts: ["pro-repair-serum", "avosilk-bloom"],
    comboPrice: 499,
    originalTotal: 545,
    savings: 46,
    badge: "Shine Bundle",
    bg: "#F5F0FA",
    accent: "#6B4C8B"
  },
  {
    id: "full-routine-bundle",
    title: "Full Routine Bundle",
    subtitle: "All 5 Core Products",
    description: "Everything you need for a complete haircare transformation — Hair Wash, Hair Oil, Conditioner, Follicra Serum & Pro Repair Serum.",
    image: "/products/media__1779362724448.png",
    includedProducts: ["herbal-wash", "radiance-oil", "avosilk-bloom", "follicra-regrowth", "pro-repair-serum"],
    comboPrice: 1699,
    originalTotal: 1877,
    savings: 178,
    badge: "Best Value",
    bg: "#FFFBEB",
    accent: "#B8860B"
  }
];

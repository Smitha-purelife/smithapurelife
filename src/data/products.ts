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
    title: "Avosilk Bloom",
    subtitle: "Avocado Rich Conditioner",
    description: "Enriched with avocado goodness to deeply moisturize and nourish dry, rough, and frizzy hair. Helps improve hair softness, smoothness, and manageability while reducing tangles and breakage.",
    image: "/products/avosilk_bloom.png",
    lifestyleImage: "/products/media__1779362724448.png",
    additionalImage: "/products/avosilk_bloom_benefits_v3.png",
    hasFullBanner: true,
    texture: "/products/avosilk_bloom_texture.png",
    accent: "#E9D5CA",
    bg: "#FDF9F6",
    benefits: ["Hydrates Dry & Brittle Hair", "Strengthens & Softens", "Locks in Moisture", "Adds Shine & Tames Frizz", "Supports Hair Growth"],
    ingredients: [
      { name: "Avocado Extract", effect: "Deeply hydrates dry, brittle hair" },
      { name: "Almond Oil", effect: "Strengthens and softens hair fibers" },
      { name: "Organic Shea Butter", effect: "Locks in moisture to prevent dryness" },
      { name: "Argan Oil", effect: "Adds shine, silkiness & tames frizz" },
      { name: "Rosemary", effect: "Supports scalp health and hair growth" }
    ],
    results: "effortlessly detangles and softens your hair with your very first wash, secretly strengthening your hair!",
    sizes: [
      { size: "50ml", price: 650, originalPrice: 799 },
      { size: "100ml", price: 1200, originalPrice: 1499 }
    ],
    category: 'haircare'
  },
  {
    id: "radiance-oil",
    title: "Radiance Hair Oil",
    subtitle: "Herbal Radiance Advance 2x Growth Revival",
    description: "A nourishing blend of natural oils and herbs that helps strengthen hair roots, reduce hair fall, improve scalp health, and support healthy hair growth. Regular use helps keep hair soft, shiny, and manageable.",
    image: "/products/herbal_radiance_hair_oil.png",
    lifestyleImage: "/products/media__1779362732647.png",
    additionalImage: "/products/radiance_oil_benefits_v3.png",
    hasFullBanner: true,
    texture: "/products/radiance_oil_texture.png",
    accent: "#F9F3CC",
    bg: "#FFFBEB",
    benefits: ["Controls Hair Fall & Dandruff", "Boosts Growth & Root Strength", "Repairs Dry, Damaged Hair", "Natural Shine & Smoothness", "100% Handcrafted & Natural"],
    ingredients: [
      { name: "Coconut Oil", effect: "Deep conditioning and fatty acid nourishment" },
      { name: "Almond (Badam) Oil", effect: "Rich in Vitamin E for hair shine and repair" },
      { name: "Castor & Jojoba Oil", effect: "Deeply locks moisture and thickens roots" },
      { name: "Cedarwood & Vetiver", effect: "Calms scalp and stimulates hair follicles" },
      { name: "Bhringraj, Amla & Brahmi", effect: "Ayurvedic herbs that boost growth & reduce fall" },
      { name: "Curry Leaves & Hibiscus", effect: "Prevents graying and conditions hair lengths" }
    ],
    results: "Controls hair fall and dandruff from the very first wash, while boosting hair growth and root strength.",
    sizes: [
      { size: "50ml", price: 850, originalPrice: 999 },
      { size: "100ml", price: 1450, originalPrice: 1699 }
    ],
    category: 'haircare'
  },
  {
    id: "herbal-wash",
    title: "Herbal Hair Wash Powder",
    subtitle: "Nature's Therapy Herbal Hair Wash Powder",
    description: "A gentle herbal cleansing powder made with traditional natural ingredients to cleanse the scalp without stripping away natural moisture. Helps reduce dandruff, control excess oil, and leave hair feeling fresh, soft, and healthy.",
    image: "/products/hair_wash_powder_v2.png",
    lifestyleImage: "/products/herbal_wash_hero_v2_png_1778593690717.png",
    additionalImage: "/products/herbal_wash_benefits_v3.png",
    texture: "/products/herbal_wash_texture.png",
    accent: "#D4E2D4",
    bg: "#F0F7F0",
    benefits: ["Reduces Hair Fall in 40 Days", "Clears Dandruff in 1st Wash", "Makes Hair Silky & Strong", "No Sulfates or Parabens", "20+ Ayurvedic Herbs"],
    ingredients: [
      { name: "Marshmallow Root", effect: "Soothes scalp irritation and provides natural slip" },
      { name: "Orange & Hibiscus", effect: "Refreshes scalp and adds natural shine" },
      { name: "Amla & Fenugreek", effect: "Cleanses scalp and reduces hair fall" },
      { name: "Shikakai & Soapnut", effect: "Gentle natural lather without sulfates" },
      { name: "Papaya & Curry Leaves", effect: "Enzyme scalp detox and prevents graying" },
      { name: "Bhringraj & 28+ Herbs", effect: "Ayurvedic blend for overall scalp vitality" }
    ],
    results: "Reduces hair fall in 40 days and clears dandruff from the 1st wash. Visible results in 3 months!",
    sizes: [
      { size: "70gm", price: 550, originalPrice: 699 },
      { size: "270gm", price: 999, originalPrice: 1199 }
    ],
    category: 'haircare'
  },
  {
    id: "pro-repair-serum",
    title: "Pro Repair Hair Serum",
    subtitle: "Silk Gloss Pro Repair Hair Serum",
    description: "A lightweight hair serum designed to control frizz, add natural shine, and protect hair from dryness. Leaves hair silky smooth, soft to touch, and easier to style without feeling greasy.",
    image: "/products/silk_gloss_pro_repair_serum.png",
    lifestyleImage: "/products/pro_repair_serum_hero_v2_png_1778593726696.png",
    additionalImage: "/products/pro_repair_serum_benefits_v3.png",
    texture: "/products/pro_repair_texture.png",
    accent: "#DBCDF0",
    bg: "#F5F0FA",
    benefits: ["Instant Soft & Shiny Feel", "Repairs Damaged Split Ends", "Glossy & Frizz-Free Finish", "100% Natural Protective Coat", "Lightweight & Non-Sticky"],
    ingredients: [
      { name: "Grapeseed Oil", effect: "Lightweight moisture and heat protection" },
      { name: "Golden Jojoba Oil", effect: "Balances natural oils and seals ends" },
      { name: "Broccoli Seed Oil", effect: "Natural silicone alternative for smooth glaze" },
      { name: "Argan Oil & Baobab Oil", effect: "Rich in antioxidants for deep damage repair" },
      { name: "Fractionated Coconut Oil", effect: "Weightless conditioning and softness" },
      { name: "Hemisqualane", effect: "Frizz control and weightless touch finish" }
    ],
    results: "Gives an instant soft, shiny & spongy feel. You'll feel a silky smooth touch instantly!",
    sizes: [
      { size: "30ml", price: 690, originalPrice: 790 },
      { size: "50ml", price: 1150, originalPrice: 1350 }
    ],
    category: 'haircare'
  },
  {
    id: "follicra-regrowth",
    title: "Follicra Regrowth Serum",
    subtitle: "Follicra - Hair Regrowth Serum",
    description: "A powerful scalp serum crafted with carefully selected natural ingredients to support healthy hair regrowth, strengthen hair roots, and nourish the scalp. Regular use helps improve the appearance of fuller, thicker, and healthier-looking hair.",
    image: "/products/follicra_proper.jpg",
    lifestyleImage: "/products/follicra_regrowth_hero.png",
    additionalImage: "/products/follicra_regrowth_benefits_v3.png",
    texture: "/products/follicra_regrowth_texture.png",
    accent: "#DDF1E9",
    bg: "#F2FAF7",
    benefits: ["Activates Bald Area Regrowth", "Reduces Hair Fall Gradually", "Strengthens Weak Hair Roots", "Healthy & Nourished Scalp", "Thickens Thinning Hair Care"],
    ingredients: [
      { name: "Rosemary Extract", effect: "Boosts blood circulation & activates dormant follicles" },
      { name: "Green Tea Extract", effect: "Antioxidant rich, helps control scalp damage" },
      { name: "Larch Tree Extract", effect: "Supports new hair growth and density" },
      { name: "Vegetable Glycerin", effect: "Deep hydration for a healthy scalp barrier" },
      { name: "Castor Oil & Peppermint", effect: "Refreshes scalp, improves flow, thickens strands" }
    ],
    results: "Baby hairs may start appearing in bald & thinning areas with regular, consistent use.",
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

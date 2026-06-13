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
  ingredientsImage?: string;
  beforeImage?: string;
  afterImage?: string;
  hasFullBanner?: boolean;
  texture: string;
  accent: string;
  bg: string;
  benefits: string[];
  ingredients: ProductIngredient[];
  results: string;
  sizes: ProductSize[];
  category: 'haircare' | 'accessories';
  baseLikes?: number;
}

export const products: Product[] = [
  {
    id: "avosilk-bloom",
    title: "Avosilk Bloom",
    subtitle: "Avocado Rich Conditioner",
    description: "Enriched with avocado goodness to deeply moisturize and nourish dry, rough, and frizzy hair. Helps improve hair softness, smoothness, and manageability while reducing tangles and breakage.",
    image: "/products/avosilk_bloom.png",
    lifestyleImage: "/products/media__1779362724448.png",
    additionalImage: "/products/avosilk_bloom_benefits_new.png",
    ingredientsImage: "/products/avosilk_bloom_ingredients.png",
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
      { size: "50ml", price: 146, originalPrice: 175 },
      { size: "100ml", price: 288, originalPrice: 349 }
    ],
    category: 'haircare',
    baseLikes: 245
  },
  {
    id: "radiance-oil",
    title: "Radiance Hair Oil",
    subtitle: "Herbal Radiance Advance 2x Growth Revival",
    description: "A nourishing blend of natural oils and herbs that helps strengthen hair roots, reduce hair fall, improve scalp health, and support healthy hair growth. Regular use helps keep hair soft, shiny, and manageable.",
    image: "/products/herbal_radiance_hair_oil.png",
    lifestyleImage: "/products/media__1779362732647.png",
    additionalImage: "/products/radiance_oil_benefits_v4.png",
    ingredientsImage: "/products/radiance_oil_ingredients.png",
    beforeImage: "/products/before_hair_fall.png",
    afterImage: "/products/after_hair_fall.png",
    hasFullBanner: true,
    texture: "/products/radiance_oil_texture.png",
    accent: "#F9F3CC",
    bg: "#FFFBEB",
    benefits: ["Reduces Hair Fall", "Strengthens Roots", "Controls Dandruff", "Healthy & Strong Hair", "Deep Nourishment", "Promotes New Hair Growth"],
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
      { size: "100ml", price: 249, originalPrice: 289 },
      { size: "200ml", price: 499, originalPrice: 560 }
    ],
    category: 'haircare',
    baseLikes: 412
  },
  {
    id: "herbal-wash",
    title: "Herbal Hair Wash Powder",
    subtitle: "Nature's Therapy Herbal Hair Wash Powder",
    description: "A gentle herbal cleansing powder made with traditional natural ingredients to cleanse the scalp without stripping away natural moisture. Helps reduce dandruff, control excess oil, and leave hair feeling fresh, soft, and healthy.",
    image: "/products/hair_wash_powder_v2.png",
    lifestyleImage: "/products/herbal_wash_lifestyle_grandma.jpg",
    additionalImage: "/products/herbal_wash_benefits_new.png",
    ingredientsImage: "/products/herbal_wash_ingredients.png",
    beforeImage: "/products/before_dandruff.png",
    afterImage: "/products/after_clean_scalp.png",
    hasFullBanner: true,
    texture: "/products/herbal_wash_texture_jars.png",
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
      { size: "70gm", price: 142, originalPrice: 175 },
      { size: "270gm", price: 539, originalPrice: 569 }
    ],
    category: 'haircare',
    baseLikes: 356
  },
  {
    id: "pro-repair-serum",
    title: "Pro Repair Hair Serum",
    subtitle: "Silk Gloss Pro Repair Hair Serum",
    description: "A lightweight hair serum designed to control frizz, add natural shine, and protect hair from dryness. Leaves hair silky smooth, soft to touch, and easier to style without feeling greasy.",
    image: "/products/silk_gloss_pro_repair_serum.png",
    lifestyleImage: "/products/pro_repair_serum_hero_real.png",
    additionalImage: "/products/pro_repair_serum_benefits_v4.png",
    ingredientsImage: "/products/pro_repair_serum_ingredients.png",
    beforeImage: "/products/before_damaged_hair.png",
    afterImage: "/products/after_repaired_hair.png",
    texture: "/products/pro_repair_texture.png",
    accent: "#DBCDF0",
    bg: "#F5F0FA",
    benefits: ["Instant Softness & Shine", "Repairs Damaged Hair & Split Ends", "Frizz Control & Lightweight Finish", "Silky Smooth Touch & Glossy Look", "Natural Protection", "Reduced Breakage", "For Men & Women"],
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
      { size: "30ml", price: 399, originalPrice: 489 }
    ],
    category: 'haircare',
    baseLikes: 198
  },
  {
    id: "follicra-regrowth",
    title: "Follicra Regrowth Serum",
    subtitle: "Follicra - Hair Regrowth Serum",
    description: "A powerful scalp serum crafted with carefully selected natural ingredients to support healthy hair regrowth, strengthen hair roots, and nourish the scalp. Regular use helps improve the appearance of fuller, thicker, and healthier-looking hair.",
    image: "/products/follicra_proper.jpg",
    lifestyleImage: "/products/follicra_regrowth_hero_real.png",
    additionalImage: "/products/follicra_regrowth_benefits_v4.png",
    ingredientsImage: "/products/follicra_regrowth_ingredients.png",
    beforeImage: "/products/before_hair_thinning.png",
    afterImage: "/products/after_hair_regrowth.png",
    texture: "/products/follicra_regrowth_texture.png",
    accent: "#DDF1E9",
    bg: "#F2FAF7",
    benefits: ["Visible New Hair Growth In Early Baldness", "Promotes Hair Regrowth", "Regrowth In Thinning Areas", "Reduces Hair Fall", "Healthier Scalp", "Visible New Baby Hair Growth", "Strengthens Hair Roots", "Improves Hair Density", "Activates Hair Follicles"],
    ingredients: [
      { name: "Rosemary Extract", effect: "Boosts blood circulation & activates dormant follicles" },
      { name: "Green Tea Extract", effect: "Antioxidant rich, helps control scalp damage" },
      { name: "Larch Tree Extract", effect: "Supports new hair growth and density" },
      { name: "Vegetable Glycerin", effect: "Deep hydration for a healthy scalp barrier" },
      { name: "Castor Oil & Peppermint", effect: "Refreshes scalp, improves flow, thickens strands" }
    ],
    results: "Baby hairs may start appearing in bald & thinning areas with regular, consistent use.",
    sizes: [
      { size: "30ml", price: 699, originalPrice: 762 }
    ],
    category: 'haircare',
    baseLikes: 289
  },
  {
    id: "satin-pillowcase",
    title: "Satin Pillowcase",
    subtitle: "Premium Silk Slumber",
    description: "Luxurious satin pillowcases designed for hair fall control, frizz-free hair, glowing skin, and better sleep.",
    image: "/products/satin_pillowcase_proper.jpg",
    lifestyleImage: "/products/satin_pillowcase_proper.jpg",
    additionalImage: "/products/satin_pillowcase_benefits.png",
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
      { size: "1 pc", price: 69, originalPrice: 69 }
    ],
    category: 'accessories',
    baseLikes: 124
  },
  {
    id: "satin-scrunchies",
    title: "Satin Scrunchies",
    subtitle: "Gentle Anti-Crease Grip",
    description: "Ultra-gentle satin scrunchies that prevent hair breakage and creasing while maintaining styles smoothly.",
    image: "/products/satin_scrunchies_proper.jpg",
    lifestyleImage: "/products/satin_scrunchies_proper.jpg",
    additionalImage: "/products/satin_scrunchies_benefits.png",
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
      { size: "1 pc", price: 29, originalPrice: 29 }
    ],
    category: 'accessories',
    baseLikes: 94
  }
];

export interface ComboVariant {
  sizeName: string;
  subtitle: string;
  includedSizes: string[];
  comboPrice: number;
  originalTotal: number;
  savings: number;
  badge: string;
}

export interface Combo {
  id: string;
  title: string;
  description: string;
  image: string;
  includedProducts: string[];
  variants: ComboVariant[];
  bg: string;
  accent: string;
  baseLikes?: number;
}

export const comboProducts: Combo[] = [
  {
    id: "daily-3step",
    title: "Daily 3-Step Hair Care Combo",
    description: "Perfect starting kit or complete value set for your daily natural haircare ritual. Cleanse with Herbal Hair Wash Powder, Nourish with Radiance Hair Oil, and Condition with Avosilk Conditioner.",
    image: "/products/combo_daily_3step.jpg",
    includedProducts: ["radiance-oil", "herbal-wash", "avosilk-bloom"],
    bg: "#F0F7F0",
    accent: "#2D7A3A",
    variants: [
      {
        sizeName: "Small Pack",
        subtitle: "100ml Oil + 70gm Powder + 50ml Conditioner",
        includedSizes: ["100ml", "70gm", "50ml"],
        comboPrice: 537,
        originalTotal: 537,
        savings: 0,
        badge: "Daily Ritual"
      },
      {
        sizeName: "Large Pack",
        subtitle: "200ml Oil + 270gm Powder + 100ml Conditioner",
        includedSizes: ["200ml", "270gm", "100ml"],
        comboPrice: 1326,
        originalTotal: 1326,
        savings: 0,
        badge: "Best Value"
      }
    ],
    baseLikes: 184
  },
  {
    id: "complete-haircare",
    title: "Complete Hair Care Combo",
    description: "Deep nutrition and frizz control for healthier, shinier hair. Includes Radiance Hair Oil, Herbal Hair Wash Powder, Avosilk Conditioner, and Pro Repair Hair Serum.",
    image: "/products/combo_complete_haircare.jpg",
    includedProducts: ["radiance-oil", "herbal-wash", "avosilk-bloom", "pro-repair-serum"],
    bg: "#F5F0FA",
    accent: "#6C5B7B",
    variants: [
      {
        sizeName: "Small Combo",
        subtitle: "100ml Oil + 70gm Powder + 50ml Conditioner + 30ml Serum",
        includedSizes: ["100ml", "70gm", "50ml", "30ml"],
        comboPrice: 936,
        originalTotal: 936,
        savings: 0,
        badge: "Complete Care"
      },
      {
        sizeName: "Large Combo",
        subtitle: "200ml Oil + 270gm Powder + 100ml Conditioner + 30ml Serum",
        includedSizes: ["200ml", "270gm", "100ml", "30ml"],
        comboPrice: 1725,
        originalTotal: 1725,
        savings: 0,
        badge: "Complete Care Value"
      }
    ],
    baseLikes: 256
  },
  {
    id: "smooth-silky",
    title: "Smooth & Silky Hair Duo",
    description: "Softens, detangles, and tames frizz for a glass-like shine. Includes Avosilk Conditioner and Pro Repair Hair Serum.",
    image: "/products/combo_smooth_silky.png",
    includedProducts: ["avosilk-bloom", "pro-repair-serum"],
    bg: "#FAF9F5",
    accent: "#8E8D8A",
    variants: [
      {
        sizeName: "Small Pack",
        subtitle: "50ml Conditioner + 30ml Serum",
        includedSizes: ["50ml", "30ml"],
        comboPrice: 545,
        originalTotal: 664,
        savings: 119,
        badge: "Frizz Defense"
      },
      {
        sizeName: "Large Pack",
        subtitle: "100ml Conditioner + 30ml Serum",
        includedSizes: ["100ml", "30ml"],
        comboPrice: 687,
        originalTotal: 838,
        savings: 151,
        badge: "Frizz Defense Value"
      }
    ],
    baseLikes: 142
  },
  {
    id: "transformation",
    title: "Complete Hair Transformation Combo",
    description: "The ultimate haircare regime for full length restoration, regrowth activation, and satin protective sleep. Includes Radiance Oil, Wash Powder, Conditioner, Pro Repair Serum, Follicra Regrowth Serum, Satin Pillowcase, and Satin Scrunchies.",
    image: "/products/combo_complete_transformation.jpg",
    includedProducts: ["radiance-oil", "herbal-wash", "avosilk-bloom", "pro-repair-serum", "follicra-regrowth", "satin-pillowcase", "satin-scrunchies"],
    bg: "#DDF1E9",
    accent: "#1A5235",
    variants: [
      {
        sizeName: "Small Combo",
        subtitle: "Oil 100ml + Powder 70g + Cond 50ml + Serums + Satin Set",
        includedSizes: ["100ml", "70gm", "50ml", "30ml", "30ml", "1 pc", "1 pc"],
        comboPrice: 1685,
        originalTotal: 1735,
        savings: 50,
        badge: "Save ₹50 Extra"
      },
      {
        sizeName: "Large Combo",
        subtitle: "Oil 200ml + Powder 270g + Cond 100ml + Serums + Satin Set",
        includedSizes: ["200ml", "270gm", "100ml", "30ml", "30ml", "1 pc", "1 pc"],
        comboPrice: 2424,
        originalTotal: 2524,
        savings: 100,
        badge: "Save ₹100 Extra"
      }
    ],
    baseLikes: 312
  }
];

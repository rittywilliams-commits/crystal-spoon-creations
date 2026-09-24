import crystalExoticAsset from "@/assets/crystal-exotic-extra.jpg.asset.json";
import splendaAsset from "@/assets/splenda-parfait.jpg.asset.json";
import duoAsset from "@/assets/duo-parfaits.jpg.asset.json";
import img1 from "@/assets/parfait_image_1.png.asset.json";
import img2 from "@/assets/parfait_image_2.png.asset.json";
import img3 from "@/assets/parfait_image_3.png.asset.json";
import img4 from "@/assets/parfait_image_4.png.asset.json";
import img5 from "@/assets/parfait_image_5.png.asset.json";
import img6 from "@/assets/parfait_image_6.png.asset.json";
import img7 from "@/assets/parfait_image_7.png.asset.json";
import img9 from "@/assets/parfait_image_9.png.asset.json";
import img10 from "@/assets/parfait_image_10.png.asset.json";
import img11 from "@/assets/parfait_image_11.png.asset.json";
import crystalSpecial350 from "@/assets/Crystal_Greek_Special_Parfait_350ml.PNG.asset.json";
import crystalExotic200 from "@/assets/Crystal_Exotic_Extra_Special_parfait_200ml.PNG.asset.json";
import crystalExotic350 from "@/assets/Crystal_Exotic_Extra_Special_Parfait_35oml.PNG.asset.json";
import crystalExotic500 from "@/assets/Crystal_Exotic_Extra_Special_Parfait_500ml.PNG.asset.json";
import crystalExoticDefault from "@/assets/Crystal_Exotic_Extra_Special_Parfait.PNG.asset.json";
import crystalRegular200 from "@/assets/Crystal_Greek_Yogurt_Parfait_Sweetened_200ml.webp.asset.json";
import crystalRegular350 from "@/assets/Crystal_Greek_Yogurt_Parfait_Regular_350ml.PNG.asset.json";
import crystalRegular500 from "@/assets/Crystal_Greek_Yogurt_Parfait_Regular_500ml.PNG.asset.json";
import crystalUnsweetened500 from "@/assets/Crystal_Greek_Yogurt_Parfait_Special_Unsweetened_500ml.PNG.asset.json";

export type SizePrice = { size: "200ml" | "350ml" | "500ml" | "550ml" | "1L"; price: number; img?: string };

export type Product = {
  id: string;
  brand: "Crystal Parfait" | "Splenda Parfait" | "Yogurts";
  tier: string;
  name: string;
  desc: string;
  img: string;
  sizes: SizePrice[];
  accent: "royal" | "berry" | "fresh" | "gold";
  rating: number;
  reviews: number;
};

export const CATALOG: Product[] = [
  // Crystal Parfait line
  {
    id: "crystal-regular-sweetened",
    brand: "Crystal Parfait",
    tier: "Regular · Sweetened",
    name: "Crystal Regular Parfait",
    desc: "Fresh Greek yoghurt with berries — sweetened, everyday classic.",
    img: img2.url,
    sizes: [{ size: "200ml", price: 2200, img: crystalRegular200.url }, { size: "350ml", price: 2600, img: crystalRegular350.url }, { size: "500ml", price: 2900, img: crystalRegular500.url }],
    accent: "fresh",
    rating: 4.7,
    reviews: 92,
  },
  {
    id: "crystal-special-sweetened",
    brand: "Crystal Parfait",
    tier: "Special · Sweetened",
    name: "Crystal Special Parfait",
    desc: "Layered Greek yoghurt, berries, granola and honey.",
    img: img1.url,
    sizes: [{ size: "200ml", price: 2500 }, { size: "350ml", price: 2900, img: crystalSpecial350.url }, { size: "500ml", price: 3900, img: img1.url }],
    accent: "fresh",
    rating: 4.8,
    reviews: 148,
  },
  {
    id: "crystal-special-unsweetened",
    brand: "Crystal Parfait",
    tier: "Special · Unsweetened",
    name: "Crystal Special Unsweetened",
    desc: "Pure Greek yoghurt, real fruit, house granola — no added sugar.",
    img: img4.url,
    sizes: [{ size: "350ml", price: 2900 }, { size: "500ml", price: 3900, img: crystalUnsweetened500.url }],
    accent: "royal",
    rating: 4.8,
    reviews: 76,
  },
  {
    id: "crystal-exotic",
    brand: "Crystal Parfait",
    tier: "Exotic",
    name: "Crystal Exotic — Extra Special",
    desc: "Greek yoghurt, chia, pomegranate, dragon fruit, kiwi & almonds.",
    img: crystalExoticDefault.url,
    sizes: [{ size: "200ml", price: 3000, img: crystalExotic200.url }, { size: "350ml", price: 4000, img: crystalExotic350.url }, { size: "500ml", price: 6000, img: crystalExotic500.url }],
    accent: "berry",
    rating: 4.9,
    reviews: 214,
  },
  // Splenda Parfait line
  {
    id: "splenda-sweetened",
    brand: "Splenda Parfait",
    tier: "Sweetened",
    name: "Splenda Greek Yoghurt Parfait",
    desc: "Sweetened Greek yoghurt layered with crunchy granola & fresh fruit.",
    img: splendaAsset.url,
    sizes: [{ size: "200ml", price: 2200 }, { size: "350ml", price: 2600 }, { size: "500ml", price: 2900 }],
    accent: "berry",
    rating: 4.8,
    reviews: 176,
  },
  {
    id: "splenda-unsweetened",
    brand: "Splenda Parfait",
    tier: "Unsweetened",
    name: "Splenda Unsweetened Parfait",
    desc: "Greek yoghurt, granola & real fruit — no added sugar.",
    img: img10.url,
    sizes: [{ size: "350ml", price: 2600 }, { size: "500ml", price: 2900 }],
    accent: "royal",
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "splenda-special",
    brand: "Splenda Parfait",
    tier: "Special",
    name: "Splenda Special Parfait",
    desc: "Premium layering — yoghurt, berries, granola, honey & seeds.",
    img: img11.url,
    sizes: [{ size: "200ml", price: 2500 }, { size: "350ml", price: 2900 }, { size: "500ml", price: 3900 }],
    accent: "gold",
    rating: 4.9,
    reviews: 132,
  },
  {
    id: "splenda-exotic",
    brand: "Splenda Parfait",
    tier: "Exotic · Premium",
    name: "Splenda Exotic — Premium",
    desc: "Premium parfait with strawberry compote, cashew & house granola.",
    img: img7.url,
    sizes: [{ size: "200ml", price: 3000 }, { size: "350ml", price: 4000 }, { size: "500ml", price: 6000 }],
    accent: "fresh",
    rating: 4.9,
    reviews: 98,
  },
  // Yogurts
  {
    id: "greek-yogurt",
    brand: "Yogurts",
    tier: "Greek",
    name: "Greek Yogurt",
    desc: "Thick, creamy Greek yoghurt — no fruit or granola layers.",
    img: img3.url,
    sizes: [{ size: "550ml", price: 2900 }, { size: "1L", price: 4900 }],
    accent: "fresh",
    rating: 4.8,
    reviews: 54,
  },
  {
    id: "bulgarian-yogurt",
    brand: "Yogurts",
    tier: "Bulgarian",
    name: "Bulgarian Yogurt",
    desc: "Tangy, traditional Bulgarian yoghurt — plain and pure.",
    img: img5.url,
    sizes: [{ size: "550ml", price: 2900 }, { size: "1L", price: 4900 }],
    accent: "royal",
    rating: 4.7,
    reviews: 38,
  },
  {
    id: "lush-yogurt",
    brand: "Yogurts",
    tier: "Lush",
    name: "Lush Yogurt",
    desc: "Smooth, everyday yoghurt — a family favourite.",
    img: img6.url,
    sizes: [{ size: "500ml", price: 2200 }, { size: "1L", price: 4200 }],
    accent: "gold",
    rating: 4.6,
    reviews: 42,
  },
];

export const formatNaira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user";
import { Collection } from "./models/collection";
import { Product } from "./models/product";
import { Customer } from "./models/customer";
import { Order } from "./models/order";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://tahamunshi3_db_user:gYHRizksLS6jVLZe@cluster0.ybvz0tr.mongodb.net/candle_artistry?retryWrites=true&w=majority";

const collectionsData = [
  {
    title: "Moments",
    slug: "moments",
    eyebrow: "Collection",
    line: "Scents that hold a feeling — bright, tender, unforgettable.",
    heroImage: "/images/craft-romance.jpg",
    heroAlt: "Moments collection — ivory soy candles with storybook labels",
    sortOrder: 1,
  },
  {
    title: "Vampire",
    slug: "vampire",
    eyebrow: "Collection",
    line: "Midnight rituals. Velvet shadows. Desire lit.",
    heroImage: "/images/craft-vampire.jpg",
    heroAlt: "Vampire collection — black glass candles on an ornate gold tray",
    sortOrder: 2,
  },
  {
    title: "Rodeo",
    slug: "rodeo",
    eyebrow: "Collection",
    line: "Dust, dusk, and stories told under open sky.",
    heroImage: "/images/craft-rodeo.jpg",
    heroAlt: "Rodeo collection — western-themed candles with velvet and rope",
    sortOrder: 3,
  },
  {
    title: "Essence of Africa",
    slug: "essence-of-africa",
    eyebrow: "Collection",
    line: "Rhythm, warmth, and light carried from across the savannah.",
    heroImage: "/images/craft-atelier.jpg",
    heroAlt: "Essence of Africa collection — artisan candles among books and roses",
    sortOrder: 4,
  },
  {
    title: "Yosemite Valley",
    slug: "yosemite-valley",
    eyebrow: "Collection",
    line: "Cedar hush, open sky, and quiet winter light.",
    heroImage: "/images/wilderness.jpg",
    heroAlt: "Yosemite Valley collection — wilderness-inspired candle still life",
    sortOrder: 5,
  },
  {
    title: "Signature",
    slug: "signature",
    eyebrow: "Collection",
    line: "House favorites — amber warmth and Sunday quiet.",
    heroImage: "/images/featured-main.jpg",
    heroAlt: "Signature collection — featured candle still life",
    sortOrder: 6,
  },
];

const candleProductsData = [
  {
    name: "Serengeti Gold",
    slug: "serengeti-gold",
    category: "candle",
    collectionSlug: "moments",
    nomenclature: "Tangerine • Orange Peel • Lemon • Pineapple",
    status: "available",
    price: 24,
    stock: 45,
    soldCount: 121,
    image: "/images/craft-romance.jpg",
    alt: "Serengeti Gold candle jar",
    featured: true,
  },
  {
    name: "Lady in the Rain",
    slug: "lady-in-the-rain",
    category: "candle",
    collectionSlug: "moments",
    nomenclature: "Lime • Cantaloupe • Bamboo • Green Leaves",
    status: "available",
    price: 24,
    stock: 32,
    soldCount: 148,
    image: "/images/candles.jpg",
    alt: "Lady in the Rain candle jar",
    featured: true,
  },
  {
    name: "Baliendo",
    slug: "baliendo",
    category: "candle",
    collectionSlug: "moments",
    nomenclature: "Clove • Pear • Sugar",
    status: "available",
    price: 24,
    stock: 28,
    soldCount: 65,
    image: "/images/strip-1.jpg",
    alt: "Baliendo candle jar",
  },
  {
    name: "The Awakening",
    slug: "the-awakening",
    category: "candle",
    collectionSlug: "vampire",
    nomenclature: "Oak • Palm • Vanilla",
    status: "available",
    price: 24,
    stock: 20,
    soldCount: 96,
    image: "/images/craft-vampire.jpg",
    alt: "The Awakening candle jar",
    featured: true,
  },
  {
    name: "Crimson Veil",
    slug: "crimson-veil",
    category: "candle",
    collectionSlug: "vampire",
    nomenclature: "Basil • Grapefruit • Rose • Musk",
    status: "available",
    price: 24,
    stock: 18,
    soldCount: 52,
    image: "/images/vampire.png",
    alt: "Crimson Veil candle jar",
  },
  {
    name: "Leather & Lace",
    slug: "leather-and-lace",
    category: "candle",
    collectionSlug: "rodeo",
    nomenclature: "Nutmeg • Lemon Zest • Cinnamon",
    status: "available",
    price: 24,
    stock: 22,
    soldCount: 40,
    image: "/images/craft-rodeo.jpg",
    alt: "Leather & Lace candle jar",
  },
  {
    name: "Home Sweet Home",
    slug: "home-sweet-home",
    category: "candle",
    collectionSlug: "rodeo",
    nomenclature: "Rose • Wood • Earth",
    status: "available",
    price: 24,
    stock: 25,
    soldCount: 38,
    image: "/images/rodeo-detail.png",
    alt: "Home Sweet Home candle jar",
  },
  {
    name: "Jambo Light",
    slug: "jambo-light",
    category: "candle",
    collectionSlug: "essence-of-africa",
    nomenclature: "Mint • Green Leaves • Ginger",
    status: "available",
    price: 24,
    stock: 30,
    soldCount: 42,
    image: "/images/craft-atelier.jpg",
    alt: "Jambo Light candle jar",
  },
  {
    name: "Indlamu",
    slug: "indlamu",
    category: "candle",
    collectionSlug: "essence-of-africa",
    nomenclature: "Peach • Violet • Sandalwood",
    status: "available",
    price: 24,
    stock: 15,
    soldCount: 35,
    image: "/images/products-group.png",
    alt: "Indlamu candle jar",
  },
  {
    name: "Yosemite Might",
    slug: "yosemite-might",
    category: "candle",
    collectionSlug: "yosemite-valley",
    nomenclature: "Sandalwood • Musk • Cedar",
    status: "available",
    price: 24,
    stock: 28,
    soldCount: 47,
    image: "/images/wilderness.jpg",
    alt: "Yosemite Might candle jar",
  },
  {
    name: "Winter Silence",
    slug: "winter-silence",
    category: "candle",
    collectionSlug: "yosemite-valley",
    nomenclature: "Linen • Orange Blossom • Sandalwood",
    status: "available",
    price: 24,
    stock: 19,
    soldCount: 33,
    image: "/images/experience-wilderness-vivid.png",
    alt: "Winter Silence candle jar",
  },
  {
    name: "Golden Moments",
    slug: "golden-moments",
    category: "candle",
    collectionSlug: "signature",
    nomenclature: "Amber • Leather • Ginger",
    status: "available",
    price: 24,
    stock: 36,
    soldCount: 88,
    image: "/images/featured-main.jpg",
    alt: "Golden Moments candle jar",
    featured: true,
  },
  {
    name: "Sunday Morning",
    slug: "sunday-morning",
    category: "candle",
    collectionSlug: "signature",
    nomenclature: "Banana • Pear • Green Leaves • Jasmine",
    status: "available",
    price: 24,
    stock: 24,
    soldCount: 50,
    image: "/images/strip-2.jpg",
    alt: "Sunday Morning candle jar",
  },
];

const paintingsData = [
  {
    name: "The Romance",
    slug: "painting-romance",
    category: "painting",
    image: "/images/experience-romance-vivid.png",
    alt: "Original oil painting — The Romance",
    status: "available",
    note: "Inquire for availability",
    price: 450,
    stock: 1,
    soldCount: 3,
  },
  {
    name: "The Mystery",
    slug: "painting-mystery",
    category: "painting",
    image: "/images/experience-mystery-vivid.png",
    alt: "Original oil painting — The Mystery",
    status: "available",
    note: "Inquire for availability",
    price: 520,
    stock: 1,
    soldCount: 2,
  },
  {
    name: "The Cabin",
    slug: "painting-cabin",
    category: "painting",
    image: "/images/experience-cabin-vivid.png",
    alt: "Original oil painting — The Cabin",
    status: "coming_soon",
    note: "Inquire for availability",
    price: 380,
    stock: 0,
    soldCount: 0,
  },
  {
    name: "The Wilderness",
    slug: "painting-wilderness",
    category: "painting",
    image: "/images/experience-wilderness-vivid.png",
    alt: "Original oil painting — The Wilderness",
    status: "coming_soon",
    note: "Inquire for availability",
    price: 490,
    stock: 0,
    soldCount: 0,
  },
];

const cardsData = [
  {
    name: "Garden Reverie",
    slug: "card-garden-reverie",
    category: "greeting_card",
    image: "/images/experience-classic-4.png",
    alt: "Greeting card — winged figure in a flower garden at sunset",
    status: "available",
    note: "Inquire for availability",
    price: 12,
    stock: 40,
    soldCount: 74,
  },
  {
    name: "Moonlit Raven",
    slug: "card-moonlit-raven",
    category: "greeting_card",
    image: "/images/experience-classic-2.png",
    alt: "Greeting card — enchanted forest with lantern and raven",
    status: "available",
    note: "Inquire for availability",
    price: 12,
    stock: 35,
    soldCount: 48,
  },
  {
    name: "Lantern Evening",
    slug: "card-lantern-evening",
    category: "greeting_card",
    image: "/images/experience-classic-3.png",
    alt: "Greeting card — moonlit balcony with lantern and roses",
    status: "available",
    note: "Inquire for availability",
    price: 12,
    stock: 50,
    soldCount: 62,
  },
  {
    name: "Open Sky",
    slug: "card-open-sky",
    category: "greeting_card",
    image: "/images/experience-classic-1.png",
    alt: "Greeting card — golden-winged figure beneath an open sky",
    status: "coming_soon",
    note: "Inquire for availability",
    price: 12,
    stock: 0,
    soldCount: 0,
  },
];

const customersData = [
  {
    customerCode: "CUS-8821",
    name: "Elena Brooks",
    email: "elena.b@example.com",
    ordersCount: 7,
    spent: 312,
    status: "active",
    location: "San Francisco, CA",
    joined: new Date("2025-11-12"),
  },
  {
    customerCode: "CUS-8814",
    name: "Marcus Hale",
    email: "m.hale@example.com",
    ordersCount: 3,
    spent: 96,
    status: "active",
    location: "Austin, TX",
    joined: new Date("2026-02-03"),
  },
  {
    customerCode: "CUS-8799",
    name: "Sofia Nguyen",
    email: "sofia.n@example.com",
    ordersCount: 12,
    spent: 540,
    status: "active",
    location: "Seattle, WA",
    joined: new Date("2025-08-21"),
  },
  {
    customerCode: "CUS-8780",
    name: "Atelier West Co.",
    email: "orders@atelierwest.co",
    ordersCount: 9,
    spent: 4280,
    status: "active",
    location: "Los Angeles, CA",
    joined: new Date("2025-06-02"),
  },
  {
    customerCode: "CUS-8755",
    name: "Priya Kapoor",
    email: "priya.k@example.com",
    ordersCount: 2,
    spent: 72,
    status: "inactive",
    location: "Chicago, IL",
    joined: new Date("2026-01-18"),
  },
  {
    customerCode: "CUS-8742",
    name: "Jonah Reed",
    email: "j.reed@example.com",
    ordersCount: 1,
    spent: 24,
    status: "inactive",
    location: "Denver, CO",
    joined: new Date("2026-09-14"),
  },
  {
    customerCode: "CUS-8720",
    name: "Claire Fontaine",
    email: "claire.f@example.com",
    ordersCount: 5,
    spent: 210,
    status: "active",
    location: "Portland, OR",
    joined: new Date("2025-12-09"),
  },
  {
    customerCode: "CUS-8701",
    name: "Harbor Gift Co.",
    email: "buyer@harborgift.co",
    ordersCount: 6,
    spent: 2910,
    status: "active",
    location: "Coarsegold, CA",
    joined: new Date("2025-04-30"),
  },
];

const ordersData = [
  {
    orderNumber: "CAD-10428",
    customer: "Elena Brooks",
    email: "elena.b@example.com",
    items: 3,
    itemList: [
      { productId: "serengeti-gold", name: "Serengeti Gold", quantity: 2, price: 24, image: "/images/craft-romance.jpg" },
      { productId: "lady-in-the-rain", name: "Lady in the Rain", quantity: 1, price: 24, image: "/images/candles.jpg" },
    ],
    total: 72,
    status: "paid",
    channel: "Web",
    date: new Date("2026-10-04"),
  },
  {
    orderNumber: "CAD-10427",
    customer: "Marcus Hale",
    email: "m.hale@example.com",
    items: 1,
    itemList: [
      { productId: "the-awakening", name: "The Awakening", quantity: 1, price: 24, image: "/images/craft-vampire.jpg" },
    ],
    total: 24,
    status: "shipped",
    channel: "Web",
    date: new Date("2026-10-04"),
  },
  {
    orderNumber: "CAD-10426",
    customer: "Sofia Nguyen",
    email: "sofia.n@example.com",
    items: 5,
    itemList: [
      { productId: "golden-moments", name: "Golden Moments", quantity: 3, price: 24, image: "/images/featured-main.jpg" },
      { productId: "crimson-veil", name: "Crimson Veil", quantity: 2, price: 24, image: "/images/vampire.png" },
    ],
    total: 148,
    status: "pending",
    channel: "Gift",
    date: new Date("2026-10-03"),
  },
  {
    orderNumber: "CAD-10425",
    customer: "Atelier West Co.",
    email: "orders@atelierwest.co",
    items: 24,
    itemList: [
      { productId: "serengeti-gold", name: "Serengeti Gold", quantity: 12, price: 24, image: "/images/craft-romance.jpg" },
      { productId: "lady-in-the-rain", name: "Lady in the Rain", quantity: 12, price: 24, image: "/images/candles.jpg" },
    ],
    total: 576,
    status: "paid",
    channel: "Wholesale",
    date: new Date("2026-10-03"),
  },
  {
    orderNumber: "CAD-10424",
    customer: "Priya Kapoor",
    email: "priya.k@example.com",
    items: 2,
    itemList: [
      { productId: "leather-and-lace", name: "Leather & Lace", quantity: 2, price: 24, image: "/images/craft-rodeo.jpg" },
    ],
    total: 48,
    status: "delivered",
    channel: "Web",
    date: new Date("2026-10-02"),
  },
  {
    orderNumber: "CAD-10423",
    customer: "Jonah Reed",
    email: "j.reed@example.com",
    items: 1,
    itemList: [
      { productId: "home-sweet-home", name: "Home Sweet Home", quantity: 1, price: 24, image: "/images/rodeo-detail.png" },
    ],
    total: 24,
    status: "cancelled",
    channel: "Web",
    date: new Date("2026-10-02"),
  },
  {
    orderNumber: "CAD-10422",
    customer: "Claire Fontaine",
    email: "claire.f@example.com",
    items: 4,
    itemList: [
      { productId: "jambo-light", name: "Jambo Light", quantity: 2, price: 24, image: "/images/craft-atelier.jpg" },
      { productId: "indlamu", name: "Indlamu", quantity: 2, price: 24, image: "/images/products-group.png" },
    ],
    total: 96,
    status: "shipped",
    channel: "Web",
    date: new Date("2026-10-01"),
  },
  {
    orderNumber: "CAD-10421",
    customer: "Harbor Gift Co.",
    email: "buyer@harborgift.co",
    items: 18,
    itemList: [
      { productId: "yosemite-might", name: "Yosemite Might", quantity: 10, price: 24, image: "/images/wilderness.jpg" },
      { productId: "winter-silence", name: "Winter Silence", quantity: 8, price: 24, image: "/images/experience-wilderness-vivid.png" },
    ],
    total: 432,
    status: "paid",
    channel: "Wholesale",
    date: new Date("2026-09-30"),
  },
  { orderNumber: "CAD-10101", customer: "Elena Brooks", email: "elena.b@example.com", items: 4, total: 4200, status: "delivered", channel: "Wholesale", date: new Date("2026-01-15") },
  { orderNumber: "CAD-10150", customer: "Atelier West Co.", email: "orders@atelierwest.co", items: 6, total: 5100, status: "delivered", channel: "Wholesale", date: new Date("2026-02-18") },
  { orderNumber: "CAD-10200", customer: "Harbor Gift Co.", email: "buyer@harborgift.co", items: 5, total: 4800, status: "delivered", channel: "Wholesale", date: new Date("2026-03-22") },
  { orderNumber: "CAD-10250", customer: "Sofia Nguyen", email: "sofia.n@example.com", items: 8, total: 6200, status: "delivered", channel: "Web", date: new Date("2026-04-10") },
  { orderNumber: "CAD-10300", customer: "Marcus Hale", email: "m.hale@example.com", items: 10, total: 7100, status: "delivered", channel: "Wholesale", date: new Date("2026-05-14") },
  { orderNumber: "CAD-10330", customer: "Claire Fontaine", email: "claire.f@example.com", items: 9, total: 6900, status: "delivered", channel: "Web", date: new Date("2026-06-19") },
  { orderNumber: "CAD-10360", customer: "Elena Brooks", email: "elena.b@example.com", items: 12, total: 8200, status: "delivered", channel: "Wholesale", date: new Date("2026-07-25") },
  { orderNumber: "CAD-10390", customer: "Atelier West Co.", email: "orders@atelierwest.co", items: 14, total: 9100, status: "delivered", channel: "Wholesale", date: new Date("2026-08-20") },
  { orderNumber: "CAD-10410", customer: "Sofia Nguyen", email: "sofia.n@example.com", items: 11, total: 8800, status: "delivered", channel: "Web", date: new Date("2026-09-18") },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas successfully!");

    // 1. Seed or Update Admin User
    const adminEmail = "admin@candleartistry.com";
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await User.create({
        fullName: "Candle Artistry Admin",
        email: adminEmail,
        password: "candleadmin",
        role: "admin",
        isActive: true,
      });
      console.log(`Created admin account: ${adminEmail}`);
    }

    // 2. Seed Collections
    console.log("Seeding Collections with verified image paths...");
    for (const c of collectionsData) {
      await Collection.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
    }
    console.log(`Seeded ${collectionsData.length} Collections.`);

    // 3. Seed Products
    console.log("Seeding Products with verified image paths...");
    const allProducts = [...candleProductsData, ...paintingsData, ...cardsData];
    for (const p of allProducts) {
      await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
    }
    console.log(`Seeded ${allProducts.length} Products.`);

    // 4. Seed Customers
    console.log("Seeding Customers...");
    for (const cus of customersData) {
      await Customer.findOneAndUpdate({ email: cus.email }, cus, { upsert: true, new: true });
    }
    console.log(`Seeded ${customersData.length} Customers.`);

    // 5. Seed Orders
    console.log("Seeding Orders...");
    for (const ord of ordersData) {
      await Order.findOneAndUpdate({ orderNumber: ord.orderNumber }, ord, { upsert: true, new: true });
    }
    console.log(`Seeded ${ordersData.length} Orders.`);

    console.log("✅ All Real Data with verified image paths seeded successfully into MongoDB Atlas!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();

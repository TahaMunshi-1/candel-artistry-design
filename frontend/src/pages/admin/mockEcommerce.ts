/** Frontend-only ecommerce demo data for the admin dashboard */

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export type DemoOrder = {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: OrderStatus;
  channel: "Web" | "Wholesale" | "Gift";
  date: string;
};

export type DemoCustomer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: "active" | "inactive";
  joined: string;
  location: string;
};

export type SalesPoint = { label: string; revenue: number; orders: number };

export const salesSeries: SalesPoint[] = [
  { label: "Jan", revenue: 4200, orders: 48 },
  { label: "Feb", revenue: 5100, orders: 56 },
  { label: "Mar", revenue: 4800, orders: 52 },
  { label: "Apr", revenue: 6200, orders: 71 },
  { label: "May", revenue: 7100, orders: 84 },
  { label: "Jun", revenue: 6900, orders: 79 },
  { label: "Jul", revenue: 8200, orders: 96 },
  { label: "Aug", revenue: 9100, orders: 108 },
  { label: "Sep", revenue: 8800, orders: 101 },
  { label: "Oct", revenue: 10400, orders: 122 },
];

export const categoryShare = [
  { label: "Candles", value: 62, color: "#C89958" },
  { label: "Paintings", value: 21, color: "#C9897F" },
  { label: "Cards", value: 17, color: "#6D8B66" },
];

/** Visual breakdown for order-status donut (derived presentation colors) */
export const orderStatusShare = [
  { label: "Completed", key: "delivered" as const, color: "#6E8663" },
  { label: "Processing", key: "shipped" as const, color: "#C67A70" },
  { label: "Pending", key: "pending" as const, color: "#D6AA6B" },
  { label: "Paid", key: "paid" as const, color: "#C89958" },
  { label: "Cancelled", key: "cancelled" as const, color: "#A95454" },
];

export const demoOrders: DemoOrder[] = [
  {
    id: "CAD-10428",
    customer: "Elena Brooks",
    email: "elena.b@example.com",
    items: 3,
    total: 72,
    status: "paid",
    channel: "Web",
    date: "2026-10-04",
  },
  {
    id: "CAD-10427",
    customer: "Marcus Hale",
    email: "m.hale@example.com",
    items: 1,
    total: 24,
    status: "shipped",
    channel: "Web",
    date: "2026-10-04",
  },
  {
    id: "CAD-10426",
    customer: "Sofia Nguyen",
    email: "sofia.n@example.com",
    items: 5,
    total: 148,
    status: "pending",
    channel: "Gift",
    date: "2026-10-03",
  },
  {
    id: "CAD-10425",
    customer: "Atelier West Co.",
    email: "orders@atelierwest.co",
    items: 24,
    total: 576,
    status: "paid",
    channel: "Wholesale",
    date: "2026-10-03",
  },
  {
    id: "CAD-10424",
    customer: "Priya Kapoor",
    email: "priya.k@example.com",
    items: 2,
    total: 48,
    status: "delivered",
    channel: "Web",
    date: "2026-10-02",
  },
  {
    id: "CAD-10423",
    customer: "Jonah Reed",
    email: "j.reed@example.com",
    items: 1,
    total: 24,
    status: "cancelled",
    channel: "Web",
    date: "2026-10-02",
  },
  {
    id: "CAD-10422",
    customer: "Claire Fontaine",
    email: "claire.f@example.com",
    items: 4,
    total: 96,
    status: "shipped",
    channel: "Web",
    date: "2026-10-01",
  },
  {
    id: "CAD-10421",
    customer: "Harbor Gift Co.",
    email: "buyer@harborgift.co",
    items: 18,
    total: 432,
    status: "paid",
    channel: "Wholesale",
    date: "2026-09-30",
  },
];

export const demoCustomers: DemoCustomer[] = [
  {
    id: "CUS-8821",
    name: "Elena Brooks",
    email: "elena.b@example.com",
    orders: 7,
    spent: 312,
    status: "active",
    joined: "2025-11-12",
    location: "San Francisco, CA",
  },
  {
    id: "CUS-8814",
    name: "Marcus Hale",
    email: "m.hale@example.com",
    orders: 3,
    spent: 96,
    status: "active",
    joined: "2026-02-03",
    location: "Austin, TX",
  },
  {
    id: "CUS-8799",
    name: "Sofia Nguyen",
    email: "sofia.n@example.com",
    orders: 12,
    spent: 540,
    status: "active",
    joined: "2025-08-21",
    location: "Seattle, WA",
  },
  {
    id: "CUS-8780",
    name: "Atelier West Co.",
    email: "orders@atelierwest.co",
    orders: 9,
    spent: 4280,
    status: "active",
    joined: "2025-06-02",
    location: "Los Angeles, CA",
  },
  {
    id: "CUS-8755",
    name: "Priya Kapoor",
    email: "priya.k@example.com",
    orders: 2,
    spent: 72,
    status: "inactive",
    joined: "2026-01-18",
    location: "Chicago, IL",
  },
  {
    id: "CUS-8742",
    name: "Jonah Reed",
    email: "j.reed@example.com",
    orders: 1,
    spent: 24,
    status: "inactive",
    joined: "2026-09-14",
    location: "Denver, CO",
  },
  {
    id: "CUS-8720",
    name: "Claire Fontaine",
    email: "claire.f@example.com",
    orders: 5,
    spent: 210,
    status: "active",
    joined: "2025-12-09",
    location: "Portland, OR",
  },
  {
    id: "CUS-8701",
    name: "Harbor Gift Co.",
    email: "buyer@harborgift.co",
    orders: 6,
    spent: 2910,
    status: "active",
    joined: "2025-04-30",
    location: "Coarsegold, CA",
  },
];

export const topProducts = [
  { name: "Lady in the Rain", sold: 148, revenue: 3552 },
  { name: "Serengeti Gold", sold: 121, revenue: 2904 },
  { name: "The Awakening", sold: 96, revenue: 2304 },
  { name: "Golden Moments", sold: 88, revenue: 2112 },
  { name: "Garden Reverie", sold: 74, revenue: 0 },
];

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function statusLabel(s: OrderStatus) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

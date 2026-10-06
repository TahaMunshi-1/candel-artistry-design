import { Request, Response } from "express";
import { Order } from "../models/order";
import { Customer } from "../models/customer";
import { Product } from "../models/product";
import { tryCatch } from "../utils/tryCatch";
import { ApiResponse } from "../utils/apiResponse";

export const getOverview = tryCatch(async (_req: Request, res: Response): Promise<any> => {
  const [orders, customers, products] = await Promise.all([
    Order.find().sort({ date: -1, createdAt: -1 }),
    Customer.find().sort({ joined: -1 }),
    Product.find().sort({ soldCount: -1 }),
  ]);

  // Total Revenue (all non-cancelled orders)
  const validOrders = orders.filter((o) => o.status !== "cancelled");
  const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  // Order status breakdown
  const statusCounts = {
    delivered: orders.filter((o) => o.status === "delivered").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    paid: orders.filter((o) => o.status === "paid").length,
    pending: orders.filter((o) => o.status === "pending").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  // Group sales by month (or recent months)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyMap = new Map<string, { revenue: number; orders: number }>();

  // Initialize current 10 months or standard calendar months
  for (let i = 0; i < 10; i++) {
    monthlyMap.set(monthNames[i], { revenue: 0, orders: 0 });
  }

  orders.forEach((o) => {
    if (!o.date) return;
    const m = monthNames[new Date(o.date).getMonth()];
    if (monthlyMap.has(m)) {
      const entry = monthlyMap.get(m)!;
      if (o.status !== "cancelled") {
        entry.revenue += o.total;
      }
      entry.orders += 1;
    }
  });

  const salesSeries = Array.from(monthlyMap.entries()).map(([label, val]) => ({
    label,
    revenue: val.revenue,
    orders: val.orders,
  }));

  // Top products
  const topProducts = products.slice(0, 5).map((p) => ({
    name: p.name,
    sold: p.soldCount || 10,
    revenue: (p.soldCount || 10) * (p.price || 24),
    category: p.category,
    image: p.image,
  }));

  // Recent 5 orders formatted
  const recentOrders = orders.slice(0, 5).map((o) => ({
    id: o.orderNumber,
    customer: o.customer,
    email: o.email,
    items: o.items,
    total: o.total,
    status: o.status,
    channel: o.channel,
    date: o.date ? o.date.toISOString().slice(0, 10) : "",
    thumb: o.itemList && o.itemList[0] ? o.itemList[0].image : "",
    productName: o.itemList && o.itemList[0] ? o.itemList[0].name : "Artisan Candle",
  }));

  return ApiResponse(res, "Overview metrics fetched successfully", {
    metrics: {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
    },
    statusCounts,
    salesSeries,
    recentOrders,
    topProducts,
  });
});

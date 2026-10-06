import mongoose from "mongoose";
import { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { Customer } from "../models/customer";
import { Product } from "../models/product";
import { tryCatch } from "../utils/tryCatch";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

export const getOrders = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { status, channel, keyword } = req.query;

  const query: any = {};
  if (status && status !== "all") {
    query.status = status;
  }
  if (channel && channel !== "all") {
    query.channel = channel;
  }
  if (keyword) {
    query.$or = [
      { orderNumber: { $regex: keyword as string, $options: "i" } },
      { customer: { $regex: keyword as string, $options: "i" } },
      { email: { $regex: keyword as string, $options: "i" } },
    ];
  }

  const orders = await Order.find(query).sort({ date: -1, createdAt: -1 });

  const formatted = orders.map((o) => ({
    id: o.orderNumber,
    _id: o._id,
    orderNumber: o.orderNumber,
    customer: o.customer,
    email: o.email,
    items: o.items,
    itemList: o.itemList,
    total: o.total,
    status: o.status,
    channel: o.channel,
    date: o.date ? o.date.toISOString().slice(0, 10) : "",
    shippingAddress: o.shippingAddress,
  }));

  return ApiResponse(res, "Orders fetched successfully", formatted);
});

export const getOrderById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);
  const order =
    (await Order.findOne({ orderNumber: id })) ||
    (isMongoId ? await Order.findById(id) : null);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  return ApiResponse(res, "Order fetched successfully", order);
});

export const createOrder = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { customer, email, items, itemList, total, channel, status, shippingAddress } = req.body;

  if (!customer || !email) {
    throw new ApiError(400, "Customer name and email are required");
  }

  const count = await Order.countDocuments();
  const orderNumber = `CAD-${10420 + count + 1}`;

  const numItems =
    items ||
    (Array.isArray(itemList)
      ? itemList.reduce((n: number, it: any) => n + (it.quantity || 1), 0)
      : 1);
  const calculatedTotal = total != null ? Number(total) : 0;

  const order = await Order.create({
    orderNumber,
    customer,
    email,
    items: numItems,
    itemList: itemList || [],
    total: calculatedTotal,
    status: (status as OrderStatus) || "paid",
    channel: channel || "Web",
    date: new Date(),
    shippingAddress: shippingAddress || {},
  });

  // Update or create customer profile
  const existingCustomer = await Customer.findOne({ email: email.toLowerCase().trim() });
  if (existingCustomer) {
    existingCustomer.ordersCount += 1;
    existingCustomer.spent += calculatedTotal;
    await existingCustomer.save();
  }

  // Update product sales count if items specified
  if (Array.isArray(itemList)) {
    for (const it of itemList) {
      if (it.productId) {
        const isMongoId = mongoose.Types.ObjectId.isValid(it.productId);
        await Product.findOneAndUpdate(
          { $or: [{ slug: it.productId }, ...(isMongoId ? [{ _id: it.productId }] : [])] },
          { $inc: { soldCount: it.quantity || 1, stock: -(it.quantity || 1) } },
        ).catch(() => null);
      }
    }
  }

  return ApiResponse(res, "Order created successfully", order, 201);
});

export const updateOrderStatus = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled"];
  if (!status || !validStatuses.includes(status)) {
    throw new ApiError(400, `Invalid order status. Allowed: ${validStatuses.join(", ")}`);
  }

  const isMongoId = mongoose.Types.ObjectId.isValid(id);
  const order =
    (await Order.findOneAndUpdate({ orderNumber: id }, { status }, { new: true })) ||
    (isMongoId ? await Order.findByIdAndUpdate(id, { status }, { new: true }) : null);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return ApiResponse(res, `Order status updated to ${status}`, order);
});

export const deleteOrder = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);

  const deleted =
    (await Order.findOneAndDelete({ orderNumber: id })) ||
    (isMongoId ? await Order.findByIdAndDelete(id) : null);

  if (!deleted) {
    throw new ApiError(404, "Order not found");
  }

  return ApiResponse(res, "Order deleted successfully", deleted);
});

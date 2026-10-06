import mongoose, { Document, Schema } from "mongoose";

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";
export type OrderChannel = "Web" | "Wholesale" | "Gift";

export interface IOrderItem {
  productId?: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface IOrder extends Document {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: number;
  itemList: IOrderItem[];
  total: number;
  status: OrderStatus;
  channel: OrderChannel;
  date: Date;
  shippingAddress?: {
    line1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    items: {
      type: Number,
      required: true,
      default: 1,
    },
    itemList: [
      {
        productId: { type: String, default: "" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0 },
        image: { type: String, default: "" },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    channel: {
      type: String,
      enum: ["Web", "Wholesale", "Gift"],
      default: "Web",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    shippingAddress: {
      line1: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "United States" },
    },
  },
  { timestamps: true },
);

orderSchema.virtual("id").get(function (this: any) {
  return this.orderNumber || this._id?.toString();
});

orderSchema.set("toJSON", { virtuals: true });
orderSchema.set("toObject", { virtuals: true });

export const Order = mongoose.model<IOrder>("Order", orderSchema);

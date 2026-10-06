import mongoose, { Document, Schema } from "mongoose";

export type ProductStatus = "available" | "coming_soon";
export type ProductCategory = "candle" | "painting" | "greeting_card";

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  collectionSlug?: string;
  nomenclature?: string;
  status: ProductStatus;
  price?: number | null;
  stock: number;
  image: string;
  alt: string;
  note?: string;
  featured: boolean;
  soldCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["candle", "painting", "greeting_card"],
      default: "candle",
    },
    collectionSlug: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    nomenclature: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["available", "coming_soon"],
      default: "available",
    },
    price: {
      type: Number,
      default: 24,
    },
    stock: {
      type: Number,
      default: 24,
    },
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.virtual("id").get(function (this: any) {
  return this.slug || this._id?.toString();
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export const Product = mongoose.model<IProduct>("Product", productSchema);

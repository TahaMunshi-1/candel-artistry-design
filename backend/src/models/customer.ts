import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
  id: string;
  customerCode: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  status: "active" | "inactive";
  ordersCount: number;
  spent: number;
  joined: Date;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    customerCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "United States",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    ordersCount: {
      type: Number,
      default: 0,
    },
    spent: {
      type: Number,
      default: 0,
    },
    joined: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

customerSchema.virtual("id").get(function (this: any) {
  return this.customerCode || this._id?.toString();
});

customerSchema.set("toJSON", { virtuals: true });
customerSchema.set("toObject", { virtuals: true });

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

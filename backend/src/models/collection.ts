import mongoose, { Document, Schema } from "mongoose";

export interface ICollection extends Document {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  line: string;
  heroImage: string;
  heroAlt: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<ICollection>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    eyebrow: {
      type: String,
      default: "Collection",
    },
    line: {
      type: String,
      default: "",
    },
    heroImage: {
      type: String,
      default: "",
    },
    heroAlt: {
      type: String,
      default: "",
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

collectionSchema.virtual("id").get(function (this: any) {
  return this.slug;
});

collectionSchema.set("toJSON", { virtuals: true });
collectionSchema.set("toObject", { virtuals: true });

export const Collection = mongoose.model<ICollection>("Collection", collectionSchema);

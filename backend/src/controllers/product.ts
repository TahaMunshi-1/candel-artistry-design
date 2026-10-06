import mongoose from "mongoose";
import { Request, Response } from "express";
import { Product } from "../models/product";
import { Collection } from "../models/collection";
import { tryCatch } from "../utils/tryCatch";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const getProducts = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { category, collectionSlug, status, keyword } = req.query;

  const query: any = {};
  if (category) query.category = category;
  if (collectionSlug) query.collectionSlug = collectionSlug;
  if (status) query.status = status;
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword as string, $options: "i" } },
      { nomenclature: { $regex: keyword as string, $options: "i" } },
      { note: { $regex: keyword as string, $options: "i" } },
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  return ApiResponse(res, "Products fetched successfully", products);
});

export const getProductById = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);
  const product =
    (await Product.findOne({ slug: id })) ||
    (isMongoId ? await Product.findById(id) : null);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return ApiResponse(res, "Product fetched successfully", product);
});

export const createProduct = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { name, category, collectionSlug, nomenclature, status, price, stock, image, alt, note, featured } =
    req.body;

  if (!name || !image) {
    throw new ApiError(400, "Product name and image are required");
  }

  const baseSlug = slugify(name);
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (await Product.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  const product = await Product.create({
    name,
    slug: uniqueSlug,
    category: category || "candle",
    collectionSlug: collectionSlug || null,
    nomenclature: nomenclature || "",
    status: status || "available",
    price: price != null ? Number(price) : category === "candle" ? 24 : null,
    stock: stock != null ? Number(stock) : 24,
    image,
    alt: alt || `${name} item`,
    note: note || "",
    featured: Boolean(featured),
  });

  return ApiResponse(res, "Product created successfully", product, 201);
});

export const updateProduct = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const patch = req.body;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);

  const product =
    (await Product.findOneAndUpdate({ slug: id }, patch, { new: true })) ||
    (isMongoId ? await Product.findByIdAndUpdate(id, patch, { new: true }) : null);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return ApiResponse(res, "Product updated successfully", product);
});

export const deleteProduct = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const isMongoId = mongoose.Types.ObjectId.isValid(id);
  const deleted =
    (await Product.findOneAndDelete({ slug: id })) ||
    (isMongoId ? await Product.findByIdAndDelete(id) : null);

  if (!deleted) {
    throw new ApiError(404, "Product not found");
  }

  return ApiResponse(res, "Product deleted successfully", deleted);
});

export const getCollections = tryCatch(async (_req: Request, res: Response): Promise<any> => {
  const collections = await Collection.find().sort({ sortOrder: 1, createdAt: 1 });
  const allCandles = await Product.find({ category: "candle" }).sort({ createdAt: 1 });

  const result = collections.map((col) => {
    const products = allCandles.filter((c) => c.collectionSlug === col.slug);
    return {
      id: col.slug,
      slug: col.slug,
      title: col.title,
      eyebrow: col.eyebrow,
      line: col.line,
      heroImage: col.heroImage,
      heroAlt: col.heroAlt,
      products,
    };
  });

  return ApiResponse(res, "Collections fetched successfully", result);
});

export const createCollection = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { title, slug, eyebrow, line, heroImage, heroAlt, sortOrder } = req.body;

  if (!title) {
    throw new ApiError(400, "Collection title is required");
  }

  const finalSlug = slug ? slugify(slug) : slugify(title);
  const existing = await Collection.findOne({ slug: finalSlug });
  if (existing) {
    throw new ApiError(400, "Collection with this slug already exists");
  }

  const collection = await Collection.create({
    title,
    slug: finalSlug,
    eyebrow: eyebrow || "Collection",
    line: line || "",
    heroImage: heroImage || "",
    heroAlt: heroAlt || "",
    sortOrder: sortOrder || 0,
  });

  return ApiResponse(res, "Collection created successfully", collection, 201);
});

export const updateCollection = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const patch = req.body;

  const collection =
    (await Collection.findOneAndUpdate({ slug: id }, patch, { new: true })) ||
    (await Collection.findByIdAndUpdate(id, patch, { new: true }));

  if (!collection) {
    throw new ApiError(404, "Collection not found");
  }

  return ApiResponse(res, "Collection updated successfully", collection);
});

export const deleteCollection = tryCatch(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const deleted =
    (await Collection.findOneAndDelete({ slug: id })) || (await Collection.findByIdAndDelete(id));

  if (!deleted) {
    throw new ApiError(404, "Collection not found");
  }

  return ApiResponse(res, "Collection deleted successfully", deleted);
});

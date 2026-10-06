import { Router } from "express";
import {
  createCollection,
  createProduct,
  deleteCollection,
  deleteProduct,
  getCollections,
  getProductById,
  getProducts,
  updateCollection,
  updateProduct,
} from "../controllers/product";

const productRouter = Router();

// Collections
productRouter.route("/collections").get(getCollections).post(createCollection);
productRouter.route("/collections/:id").put(updateCollection).delete(deleteCollection);

// Products
productRouter.route("/").get(getProducts).post(createProduct);
productRouter.route("/:id").get(getProductById).put(updateProduct).patch(updateProduct).delete(deleteProduct);

export { productRouter };

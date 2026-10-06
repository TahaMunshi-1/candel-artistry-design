import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/order";

const orderRouter = Router();

orderRouter.route("/").get(getOrders).post(createOrder);
orderRouter.route("/:id").get(getOrderById).delete(deleteOrder);
orderRouter.route("/:id/status").patch(updateOrderStatus).put(updateOrderStatus);

export { orderRouter };

import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  toggleCustomerStatus,
  updateCustomer,
} from "../controllers/customer";

const customerRouter = Router();

customerRouter.route("/").get(getCustomers).post(createCustomer);
customerRouter.route("/:id").get(getCustomerById).put(updateCustomer).patch(updateCustomer).delete(deleteCustomer);
customerRouter.route("/:id/status").patch(toggleCustomerStatus).put(toggleCustomerStatus);

export { customerRouter };

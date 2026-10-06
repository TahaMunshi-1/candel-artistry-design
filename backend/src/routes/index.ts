import express from "express";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";
import { userManagementRouter } from "./userManagement";
import { productRouter } from "./product";
import { orderRouter } from "./order";
import { customerRouter } from "./customer";
import { analyticsRouter } from "./analytics";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/user-management", userManagementRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/customers", customerRouter);
router.use("/analytics", analyticsRouter);

export { router };

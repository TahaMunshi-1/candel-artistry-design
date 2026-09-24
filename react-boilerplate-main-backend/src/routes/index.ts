import express from "express";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";
import { userManagementRouter } from "./userManagement";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/user-management", userManagementRouter);


export { router };

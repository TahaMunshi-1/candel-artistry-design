import { Router } from "express";
import { getOverview } from "../controllers/analytics";

const analyticsRouter = Router();

analyticsRouter.route("/overview").get(getOverview);

export { analyticsRouter };

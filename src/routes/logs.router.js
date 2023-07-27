import { Router } from "express";
import toAsyncRouter from "async-express-decorator";
import * as controllerModule from "../controllers/logs.controllers.js";
import handlePolicies from "../middlewares/policies/handlePolicies.js";

const router = toAsyncRouter(Router());

router.get("/loggerTest", handlePolicies(["PUBLIC"]), controllerModule.getLogs);

export default router;
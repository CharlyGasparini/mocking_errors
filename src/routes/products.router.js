import { Router } from "express";
import { parseToNumber } from "../utils.js/";
import toAsyncRouter from "async-express-decorator";
import passport from "passport";
import handlePolicies from "../middlewares/policies/handlePolicies.js";
import * as controllerModule from "../controllers/products.controllers.js";

const router = toAsyncRouter(Router());

// Devuelve los productos en la DB
router.get("/", passport.authenticate("jwt", {session: false}), handlePolicies(["ADMIN"]), controllerModule.getProducts)
// Devuelve un mock de 100 productos generados aleatoriamente
router.get("/mockingproducts", handlePolicies(["PUBLIC"]), controllerModule.getMockingProducts)
// Agrega un producto a la DB
router.post("/", passport.authenticate("jwt", {session: false}), handlePolicies(["ADMIN"]), parseToNumber, controllerModule.createProduct)

export default router;
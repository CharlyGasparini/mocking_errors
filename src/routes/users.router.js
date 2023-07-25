import { Router } from "express";
import * as controllerModule from "../controllers/users.controllers.js";
import { parseToNumber } from "../utils.js";
import toAsyncRouter from "async-express-decorator";
import passport from "passport";
import handlePolicies from "../middlewares/policies/handlePolicies.js";

const router = toAsyncRouter(Router());

// Lógica de login
router.post("/login", handlePolicies(["PUBLIC"]), controllerModule.login)
// Lógica de logout
router.get("/logout", passport.authenticate("jwt", {session: false}), handlePolicies(["USER", "ADMIN"]), controllerModule.logout)
// Lógica de registro
router.post("/register", handlePolicies(["PUBLIC"]), parseToNumber, controllerModule.register)
// Lógica que retorna contenido del token
router.get("/current", passport.authenticate("jwt", {session: false}), handlePolicies(["USER", "ADMIN"]), controllerModule.getCurrentUser)

export default router;
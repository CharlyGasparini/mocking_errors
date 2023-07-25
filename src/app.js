import express from "express";
import "./dao/mongo/dbConfig.js"; // Conexión a base de datos con mongoose
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import errorHandler from "./middlewares/errors/index.js";

const app = express(); // Creación de server HTTP

app.use(express.json()); // Soporte para .json
app.use(express.urlencoded({ extended: true })); // Soporte para params varios en las rutas
app.use(express.static(`${__dirname}/public`)); // Acceso a archivos estáticos
app.use(cookieParser());

// Passport
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

// Custom errors
app.use(errorHandler);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

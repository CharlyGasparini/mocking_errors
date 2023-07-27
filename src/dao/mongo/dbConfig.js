import mongoose from "mongoose";
import config from "../../config/config.js";
import { logger } from "../../logger.js";

try {
    await mongoose.connect(config.mongoUrl);
    logger.info("Conectado")
} catch (error) {
    logger.error(error);
}
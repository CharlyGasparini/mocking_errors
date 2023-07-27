import { logger } from "../../logger.js";
import productsModel from "./models/products.model.js";

export default class ProductManagerDb {
    constructor () {
        logger.info("Working products with DB");
    }

    getAll = async () => {
        const products = await productsModel.find().lean();
        return products;
    }

    create = async (product) => {
        const result = await productsModel.create(product);
        return result;
    }
}
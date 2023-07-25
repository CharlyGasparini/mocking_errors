import * as serviceModule from "../services/products.service.js";
import { generateProducts } from "../utils.js";
import CustomError from "../middlewares/errors/CustomError.js";
import EErrors from "../middlewares/errors/enums.js";
import * as info from "../middlewares/errors/info.js";

const getProducts = async (req, res) => {
    const products = await serviceModule.getProducts(); // Traigo el array de productos
    res.send({status: "success", payload: products});
}

const createProduct = async (req, res) => {
    const product = req.body;
    const {title, description, price, code, stock, category} = product; // Traigo el producto a agregar desde el body

    if(!title || !description || !price || !code || !stock || !category){
        throw CustomError.createError({
            name: "ProductError",
            cause: info.productError(product),
            message: "Error al intentar crear un producto",
            code: EErrors.INVALID_TYPE_ERROR
        })
    }

    product.status = true;
    const result = await serviceModule.createProduct(product); // Agrego el producto
    res.send({status: "success", payload: result});
}

const getMockingProducts = (req, res) => {
    let products = [];
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts());
    }
    res.send({
        status: "success", 
        count: products.length, 
        payload: products
    });
}

export {
    getProducts,
    createProduct,
    getMockingProducts
}
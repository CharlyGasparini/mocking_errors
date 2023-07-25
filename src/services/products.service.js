import { productsRepository } from "../repositories/index.js";
// import { v4 as uuidv4 } from 'uuid';

// const products = [];

const getProducts = async () => {
    const products = await productsRepository.getProducts();
    return products;
}

const createProduct = async (data) => {
    const {title, description, price, code, stock, category} = data;
    const product = {
        title,
        description,
        price,
        code,
        stock,
        category,
        // _id: uuidv4()
    }
    const result = await productsRepository.createProduct(product);
    // products.push(product);
    // return product;
    return result;
}

export{
    getProducts,
    createProduct
}
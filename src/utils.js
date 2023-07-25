import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { faker } from "@faker-js/faker";

const PRIVATE_KEY = 'secretCoder';
faker.locale = "es";

// Convención nomenclatura: para temas de paths __nombre
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Funciones de bcrypt
const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

// jwt
const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, {expiresIn: "24h"} );
    return token;
}

const parseToNumber = (req, res, next) => {
    const keys = ["price", "stock", "age"];
    for(let key in req.body){
        if(keys.includes(key)) {
            req.body[key] = Number(req.body[key]);
        }
    }
    next();
}

// Generador de mocks de productos
const generateProducts = () => {
    const numberOfImages = Number(faker.random.numeric(1,{ allowLeadingZeros: false, bannedDigits: ["4","5","6","7","8","9"]}));
    const thumbnails = []

    for(let i = 0; i < numberOfImages; i++) {
        thumbnails.push(faker.image.image());
    }
    
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.random.alphaNumeric(6),
        stock: faker.random.numeric(1),
        category: faker.helpers.arrayElement(["consolas", "juegos", "accesorios"]),
        status: true,
        thumbnails,
        _id: faker.database.mongodbObjectId()
    }
}

// Validar formato de email
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export {
    __dirname,
    parseToNumber,
    createHash,
    isValidPassword, 
    generateToken,
    isValidEmail,
    generateProducts
};
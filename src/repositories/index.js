import ProductManagerDb from "../dao/mongo/ProductManagerDb.js";
import UserManagerDb from "../dao/mongo/UserManagerDb.js";
import ProductsRepository from "./product.repositories.js";
import UsersRepository from "./user.repositories.js";

const productsRepository = new ProductsRepository(new ProductManagerDb());
const usersRepository = new UsersRepository(new UserManagerDb());

export {
    productsRepository,
    usersRepository
}

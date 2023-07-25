
export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts = async () => {
        const result = await this.dao.getAll();
        return result;
    }

    getProductById = async (pid) => {
        const result = await this.dao.getById(pid);
        return result;
    }

    createProduct = async (product) => {
        const result = await this.dao.create(product);
        return result;
    }
}
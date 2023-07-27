import { logger } from "../../logger.js";
import userModel from "./models/users.models.js";

export default class UserManagerDb {
    constructor() {
        logger.info("Working users with DB");
    }

    get = async (email) => {
        const user = await userModel.findOne({email});
        return user;
    }

    create = async (user) => {
        const result = await userModel.create(user);
        return result;
    }
}
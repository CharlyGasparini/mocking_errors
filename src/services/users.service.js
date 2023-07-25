import { usersRepository } from "../repositories/index.js";
import { createHash } from "../utils.js";
// import { v4 as uuidv4 } from 'uuid';

// const users = [];

const getUser = async (email) => {
    const user = await usersRepository.getUser(email);
    // const user = users.find(user => user.email === email);
    return user;
}

const createUser = async (data) => {
    const {first_name, last_name, email, age, password} = data;
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: "user",
        // _id: uuidv4()
    }
    // users.push(user);
    // return user;
    const result = await usersRepository.createUser(user);
    return result;
}

export {
    getUser,
    createUser
}
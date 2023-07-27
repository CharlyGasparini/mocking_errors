import * as usersServiceModule from "../services/users.service.js";
import config from "../config/config.js";
import { generateToken, isValidEmail, isValidPassword } from "../utils.js";
import UserDto from "../dao/DTOs/user.dto.js";
import CustomError from "../middlewares/errors/CustomError.js";
import EErrors from "../middlewares/errors/enums.js";
import * as info from "../middlewares/errors/info.js";

const login = async (req, res) => { 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toString()}`);   
    const {email, password} = req.body;

    if(!email || !password) {
        throw CustomError.createError({
            name: "LoginError",
            cause: info.loginError(req.body),
            message: "Error al intentar login",
            code: EErrors.INVALID_TYPE_ERROR
        })
    }

    if(!isValidEmail(email)){
        throw CustomError.createError({
            name: "FormatError",
            cause: info.emailError(email),
            message: "Formato de mail inválido",
            code: EErrors.INVALID_FORMAT_ERROR
        })
    }
    
    if(email === config.adminName && password === config.adminPassword){
        // Generación del token
        const accessToken = generateToken({
            first_name: "Coder",
            last_name: "House",
            email,
            role: "admin"
        })

        return res.cookie("cookieToken", accessToken, { maxAge: 60*60*1000, httpOnly: true}).send({status: "success", message: "Login exitoso, bienvenido"});
    }

    const user = await usersServiceModule.getUser(email);
    
    if(!user) {
        throw CustomError.createError({
            name: "UserError",
            cause: info.userNotFoundError(user),
            message: "Usuario no encontrado",
            code: EErrors.USER_NOT_FOUND
        })
    }
    
    const comparePassword = isValidPassword(user, password);
    
    if(!comparePassword) {
        throw CustomError.createError({
            name: "PasswordError",
            cause: info.passwordError(password),
            message: "Password incorrecto",
            code: EErrors.INCORRECT_CREDENTIALS
        })
    }
    
    const accessToken = generateToken(user);
    res.cookie("cookieToken", accessToken, { maxAge: 60*60*1000, httpOnly: true}).send({status: "success", message: "Login exitoso, bienvenido"});
}

const logout = (req, res) => {
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toString()}`);
    res.clearCookie("cookieToken").send({status: "success", message: "Deslogueado con éxito"});
}

const register = async (req, res) => {
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toString()}`);
    const { first_name, last_name, age, email, password} = req.body;
    if(!first_name || !last_name || !age || !email || !password){
        throw CustomError.createError({
            name: "UserError",
            cause: info.userError(req.body),
            message: "Error al intentar crear un usuario",
            code: EErrors.INVALID_TYPE_ERROR
        })
    }
    
    req.body.age = Number(req.body.age);

    const userExist = await usersServiceModule.getUser(email);
    if(userExist) {
        throw CustomError.createError({
            name: "UserError",
            cause: info.userExistsError(req.body),
            message: "Error al intentar crear un usuario",
            code: EErrors.DUPLICATE_ERROR
        })
    }
    
    const result = await usersServiceModule.createUser(req.body);
    res.send({status: "success", payload: result})
}

const getCurrentUser = (req, res) => {
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toString()}`);
    const result = new UserDto(req.user);
    res.send({status: "success", payload: result});
}

export {
    login,
    logout,
    register,
    getCurrentUser
}
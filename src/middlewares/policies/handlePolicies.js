import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import * as info from "../errors/info.js";

const handlePolicies = (policies) => (req, res, next) => {
    if(policies[0] === 'PUBLIC') return next();
    
    const user = req.user;

    // if(!policies.includes(user.role.toUpperCase()))
    //     return res.status(403).json({ message: 'Acceso no autorizado' })
    if(!policies.includes(user.role.toUpperCase()))
        throw CustomError.createError({
            name: "RoleError",
            cause: info.roleError(user, policies),
            message: "El usuario no esta autorizado a acceder al contenido",
            code: EErrors.USER_NOT_AUTHORIZED
        })

    next();
}

export default handlePolicies;
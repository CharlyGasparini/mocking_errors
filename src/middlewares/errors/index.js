import EErrors from "./enums.js";

export default (error, req, res, next) => {
    switch(error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                description: error.cause
            })
            break;
        case EErrors.USER_NOT_FOUND:
            res.status(403).send({
                status: "error",
                error: error.name,
                description: error.cause
            })
            break;
        case EErrors.USER_NOT_AUTHORIZED:
            res.status(403).send({
                status: "error",
                error: error.name,
                description: error.cause
            })
            break;
        case EErrors.INCORRECT_CREDENTIALS:
            res.status(401).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
        case EErrors.DUPLICATE_ERROR:
            res.status(401).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
        case EErrors.DATABASE_ERROR:
            res.status(500).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
        default:
            res.status(500).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
    }
    next();
}
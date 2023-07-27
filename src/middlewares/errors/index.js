import EErrors from "./enums.js";

export default (error, req, res, next) => {
    switch(error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(400).send({
                status: "error",
                error: error.name,
                description: error.cause
            })
            break;
        case EErrors.USER_NOT_FOUND:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(403).send({
                status: "error",
                error: error.name,
                description: error.cause
            })
            break;
        case EErrors.USER_NOT_AUTHORIZED:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(403).send({
                status: "error",
                error: error.name,
                description: error.cause
            })
            break;
        case EErrors.INCORRECT_CREDENTIALS:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(401).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
        case EErrors.DUPLICATE_ERROR:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(401).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
        case EErrors.DATABASE_ERROR:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(500).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
        default:
            req.logger.error(`${error.message} - ${new Date().toString()}`);
            res.status(500).send({
                status: "error",
                error: error.name,
                description: error.cause
            });
            break;
    }
    next();
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (_req, _res, next) => {
    const error = new Error("Not Found");
    error.statusCode = 404;
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandlers.js.map
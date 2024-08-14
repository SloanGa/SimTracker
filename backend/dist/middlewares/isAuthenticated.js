"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req) {
        return next();
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map
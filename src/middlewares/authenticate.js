"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtUtils_1 = require("../utils/jwtUtils");
/**
 * Middleware function to authenticate requests.
 * It checks for a valid JWT token in the 'Authorization' header of the request.
 * If the token is valid, it decodes the token and adds the decoded payload to the request object as 'req.user'.
 * If the token is missing or invalid, it returns a 401 Unauthorized response.
 *
 * @param {AuthenticatedRequest} req - The Express request object, extended with a 'user' property.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 */
var authenticate = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    var token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, jwtUtils_1.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};
exports.default = authenticate;

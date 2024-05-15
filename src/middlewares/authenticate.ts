import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwtUtils';

// Define an interface that extends the existing Express Request interface
interface AuthenticatedRequest extends Request {
    user?: any; // Define the user property
}

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
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

export default authenticate;
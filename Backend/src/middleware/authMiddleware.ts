import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/tokenUtils';

export interface AuthRequest extends Request {
    user?: string; // userId
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
        return res.status(403).json({ message: 'Invalid or expired access token' });
    }

    req.user = decoded.userId;
    next();
};

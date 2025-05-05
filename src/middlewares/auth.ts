import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../infrastructure/config/auth';
import { AuthService } from '../application/services/AuthService';
import { AuthenticatedRequest } from './middleware';


export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token === undefined) {
    res.status(401).json({ message: 'Acceso denegado' });
    return;
  }

  const decoded = AuthService.verifyToken(token);
  console.log("decoded ", decoded);
  if (!decoded) {
    res.status(403).json({ message: 'Token inválido' });
    return;
  }

  req.user = { userId: decoded.id };
  next();
};
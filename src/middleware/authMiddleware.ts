
// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import { RequestWithUserId } from '../types';  


const authMiddleware = async (req: RequestWithUserId, res: Response, next: NextFunction): Promise<boolean> => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({ error: 'Unauthorized - Token not provided' });
      return false;
    }

    const decodedToken = await UserService.verifyToken(token);

    if (!decodedToken) {
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
      return false;
    }

    // Adicionar o ID do usuário ao objeto de solicitação para uso posterior
    req.userId = decodedToken.userId;

    next();
    return true;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    return false;
  }
};

export default authMiddleware;
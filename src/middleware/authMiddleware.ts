// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import { RequestWithUserId } from '../types';  

const authMiddleware = async (req: RequestWithUserId, res: Response, next: NextFunction): Promise<boolean> => {
  const startTime = Date.now(); // Movido para o início da função

  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      logRequestDetails(req, 401, 'Unauthorized - Token not provided', startTime);
      res.status(401).json({ error: 'Unauthorized - Token not provided' });
      return false;
    }

    const decodedToken = await UserService.verifyToken(token);

    if (!decodedToken) {
      logRequestDetails(req, 401, 'Unauthorized - Invalid token', startTime);
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
      return false;
    }

    // Adicionar o ID do usuário ao objeto de solicitação para uso posterior
    req.userId = decodedToken.userId;

    // Registra detalhes da solicitação de sucesso
    logRequestDetails(req, 200, 'Authentication successful', startTime);

    next();
    return true;
  } catch (error: any) {
    console.error(error);

    if (error.name === 'JsonWebTokenError') {
      // Token inválido
      logRequestDetails(req, 401, 'Unauthorized - Invalid token', startTime);
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      // Token expirado
      logRequestDetails(req, 401, 'Unauthorized - Token expired', startTime);
      res.status(401).json({ error: 'Unauthorized - Token expired' });
    } else {
      // Outros erros internos
      logRequestDetails(req, 500, 'Internal Server Error', startTime);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    return false;
  }
};

const logRequestDetails = (req: Request, statusCode: number, message: string, startTime: number): void => {
  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log(`[${new Date()}] ${req.method} ${req.originalUrl} - ${statusCode} - ${message} - Tempo de execução: ${elapsedTime}ms`);
};

export default authMiddleware;

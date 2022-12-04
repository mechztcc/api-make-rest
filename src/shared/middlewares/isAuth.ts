import authConfig from '@config/auth/auth';

import AppError from '@config/errors/AppError';
import { Roles } from '@shared/types/Roles';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  // Bearer huehdkaksu12312jjdkau2312
  const [bearer, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;
    request.user = { id: sub };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}

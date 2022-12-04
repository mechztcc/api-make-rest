import authConfig from '@config/auth/auth';

import AppError from '@config/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuth(
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
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as ITokenPayload;
    request.user = { id: sub };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}

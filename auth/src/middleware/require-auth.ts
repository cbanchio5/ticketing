import { Request, Response, NextFunction } from 'express';
import { NotAuhtorizeError } from '../errors/not-authorize-error';
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.currentUser) {
    throw new NotAuhtorizeError();
  }

  next();
}

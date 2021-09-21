import { Request, Response, NextFunction } from 'express';

const admin = true;

const adminAccess = (req: Request, res: Response, next: NextFunction) => {
  if (admin) {
    return next();
  }
  res.status(403).json({
    error: -1,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`,
  });
};

export default adminAccess;

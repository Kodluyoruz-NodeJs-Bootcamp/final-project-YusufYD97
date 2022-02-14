import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, `${process.env.JWT_SECRET}`, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
        next();
      } else {
        res.locals.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default checkToken;
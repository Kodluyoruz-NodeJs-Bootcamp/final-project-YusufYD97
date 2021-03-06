import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
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
        console.log(decoded);
        // @ts-ignore
        if (decoded.isAdmin) {
          next();
        } else {
          return res.status(403).json({
            message: 'You are not authorized to perform this action.'
          })
        }
      }
    });
  } else {
    return res.status(401).json({
      message: 'Token invalid or expired!',
    });
  }
};

export default checkAdmin;
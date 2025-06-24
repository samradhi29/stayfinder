import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sam";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No token, authorization denied" });
    return; // just return, don’t return res
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.id;
    next(); // call next to continue middleware chain
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
    return; // just return, no returned value
  }
};

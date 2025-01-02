import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; name: string; email?: string }
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Token not found' })
    return
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (
      err: jwt.VerifyErrors | null,
      user: jwt.JwtPayload | string | undefined
    ) => {
      if (err) {
        res.status(403).json({ message: 'Forbidden: Invalid token' })
        return
      }

      if (typeof user === 'string' || !user) {
        res.status(403).json({ message: 'Forbidden: Invalid token payload' })
        return
      }

      req.user = user as { id: string; name: string; email?: string }
      next()
    }
  )
}

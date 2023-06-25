import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export function validateToken(req: Request, res: Response, next: NextFunction) {
	const token = req.headers['x-access-token'] as string
	if (!token) return res.status(401).send({auth: false, message: 'No token provided.'})

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
		res.locals.userId = decoded.id;
		next();
	  } catch (err) {
		res.status(403).json({ message: 'Invalid token' });
	  }
}
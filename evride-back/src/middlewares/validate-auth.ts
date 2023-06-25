import { signUpSchema } from "../schema/signup-schema";
import { signInSchema } from "../schema/signin-schema";
import { Request, Response, NextFunction } from "express";

export function validateSignUp(req: Request, res: Response, next: NextFunction) {
	try {
		const { error } = signUpSchema.validate(req.body);
		if (error) {
			throw {
				status: 400,
				message: error.message
			};
		}
		next();
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export function validateSignIn(req: Request, res: Response, next: NextFunction) {
	try {
		const { error } = signInSchema.validate(req.body);
		if (error) {
			throw {
				status: 400,
				message: error.message
			};
		}
		next();
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}
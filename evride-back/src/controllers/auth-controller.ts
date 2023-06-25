import * as authSerivce from '../services/auth-service';
import { Request, Response } from 'express';

export async function createUser(req: Request, res: Response) {
	try {
		const { email, password, name, type, pictureUrl } = req.body;
		await authSerivce.createUser(email, password, name, type, pictureUrl);
		res.status(201).send('Registered');
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function signIn(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		const token = await authSerivce.signIn(email, password);
		res.status(200).send({ token });
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

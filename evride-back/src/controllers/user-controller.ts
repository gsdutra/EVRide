import { Request, Response } from "express";
import * as userRepository from '../repositories/user-repository'

export async function getUserData(req: Request, res: Response) {
	try {
		const { userId } = res.locals;
		const userData = await userRepository.getUserData(userId)
		res.status(200).send(userData);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}
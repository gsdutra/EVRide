import {listingSchema} from '../schema/listing-schema';
import { Request, Response, NextFunction } from "express";

export function validateListing(req: Request, res: Response, next: NextFunction) {
	try {
		const { error } = listingSchema.validate(req.body);
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
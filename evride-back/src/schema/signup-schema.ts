import joi from 'joi';

export const signUpSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(5).required(),
	name: joi.string().min(1).required(),
	type: joi.string().valid('personal', 'store').required(),
	pictureUrl: joi.string().uri()
});
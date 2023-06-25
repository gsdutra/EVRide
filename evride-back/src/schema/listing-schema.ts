import joi from 'joi';

export const listingSchema = joi.object({
	id: joi.number().integer().min(1),
	brandId: joi.number().integer().min(1).required(),
	modelId: joi.number().integer().min(1).required(),
	year: joi.number().integer().strict(true).min(1900).max(2099).required(),
	price: joi.number().integer().strict(true).min(1).required(),
	mileage: joi.number().integer().strict(true).min(0).required(),
	plateEnding: joi.number().integer().strict(true).min(1).max(9).required(),
	acceptsTrade: joi.boolean().required(),
	description: joi.string().min(1).max(1000).required(),
	state: joi.string().min(1).max(255).required(),
	city: joi.string().min(1).max(255).required(),
	fuel: joi.string().min(1).max(255).required(),
	category: joi.string().min(1).max(255).required(),
	imagesArray: joi.array().items(joi.string()).required()
});
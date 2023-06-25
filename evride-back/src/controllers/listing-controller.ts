import * as listingService from '../services/listing-service';
import { Request, Response } from 'express';

export async function getListingById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const listing = await listingService.getListingById(Number(id));
		res.status(200).send(listing);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function getListings(req: Request, res: Response) {
	try {
		const listings = await listingService.getListings(req.query);
		res.status(200).send(listings);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function getBrands(req: Request, res: Response) {
	try {
		const brands = await listingService.getBrands();
		res.status(200).send(brands);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function getModelsByBrand(req: Request, res: Response) {
	try {
		const models = await listingService.getModelsByBrand(Number(req.params.brandId));
		res.status(200).send(models);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function addBrand(req: Request, res: Response) {
	try {
		const brand = await listingService.addBrand(req.body.brand);
		res.status(201).send(brand);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function addModel(req: Request, res: Response) {
	try {
		const model = await listingService.addModel(req.body.model, Number(req.body.brandId));
		res.status(201).send(model);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function createListing(req: Request, res: Response) {
	try {
		const {userId} = res.locals;
		const listing = await listingService.createListing(userId, req.body);
		res.status(201).send(listing);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function updateListing(req: Request, res: Response) {
	try {
		const listing = await listingService.updateListing(req.body);
		res.status(200).send(listing);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}
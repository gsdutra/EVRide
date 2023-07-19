import * as listingRepository from '../repositories/listing-repository';
import { Listing } from '@prisma/client'

export async function getListings(listingData: any) {
	return listingRepository.getListings(listingData);
}

export async function getListingById(id: number) {
	if (!id) throw { status: 400, message: 'Id is required' };
	const listing = await listingRepository.getListingById(id);
	if (!listing) throw { status: 404, message: 'Listing not found' };
	return listing;
}

export async function getBrands() {
	return listingRepository.getBrands();
}

export async function getModelsByBrand(brandId: number) {
	return listingRepository.getModelsByBrand(brandId);
}

export async function addBrand(brand: string) {
	if (!brand) throw { status: 400, message: 'Brand is required' };
	const alreadyExists = await listingRepository.verifyBrand(brand);
	if (alreadyExists) return alreadyExists;
	return listingRepository.addBrand(brand);
}

export async function addModel(model: string, brandId: number) {
	if (!model) throw { status: 400, message: 'Model is required' };
	const alreadyExists = await listingRepository.verifyModel(model, brandId);
	if (alreadyExists) return alreadyExists;
	return listingRepository.addModel(model, brandId);
}

export async function createListing(userId: number, listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'> & { imagesArray: string[] }) {
	const imagesArray = listing.imagesArray;
	delete listing.imagesArray;
	const listingCreated = await listingRepository.createListing(userId, listing);
	if (!listingCreated) throw { status: 500, message: 'Error creating listing' };
	for (const image of imagesArray) {
		await listingRepository.addImage(listingCreated.id, image);
	}
	return listingCreated;
}

export async function updateListing(listing: Omit<Listing, 'createdAt' | 'updatedAt'>) {
	return listingRepository.updateListing(listing);
}

export async function deleteListing(userId: number, listingId: number) {
	const listing = await listingRepository.getListingById(listingId)
	if (listing.sellerId !== userId) throw { status: 403, message: 'Listing does not belong to user.' }
	const deleteListing = await listingRepository.deleteListing(listingId)
	return deleteListing
}
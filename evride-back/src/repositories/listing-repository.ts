import prisma from '../config/database';
import {Fuel, Category, Listing} from '@prisma/client';
import { SearchListing } from '../types';

export async function getListingById(id: number) {
	return prisma.listing.findUnique({
		where: {
			id
		},
		include: {
			brand: true,
			model: true,
			images: true
		}
	});
}

export async function getListings(listing: SearchListing) {
	let where: any = {};
	if (listing.sellerId) where.sellerId = Number(listing.sellerId)
	if (listing.brandId) where.brandId = Number(listing.brandId)
	if (listing.modelId) where.modelId = Number(listing.modelId)
	if (listing.acceptsTrade) where.acceptsTrade = Boolean(listing.acceptsTrade)
	if (listing.fuel) where.fuel = listing.fuel as Fuel
	if (listing.category) where.category = listing.category as Category
	if (listing.plateEnding) where.plateEnding = Number(listing.plateEnding)
	if (listing.maxYear) where.year = { lte: Number(listing.maxYear) }
	if (listing.minYear) where.year = { gte: Number(listing.minYear) }
	if (listing.maxPrice) where.price = { lte: Number(listing.maxPrice) }
	if (listing.minPrice) where.price = { gte: Number(listing.minPrice) }
	if (listing.maxMileage) where.mileage = { lte: Number(listing.maxMileage) }
	if (listing.minMileage) where.mileage = { gte: Number(listing.minMileage) }
	if (listing.state) where.state = listing.state
	if (listing.city) where.city = listing.city

	return prisma.listing.findMany(
		{ where,
			include: {
				brand: true,
				model: true,
				images: true
			}
		}
		);
}

export async function getBrands() {
	return prisma.brand.findMany();
}

export async function getModelsByBrand(brandId: number) {
	return prisma.model.findMany({
		where: {
			brandId
		}
	});
}

export async function addBrand(brand: string) {
	return prisma.brand.create({
		data: {
			name: brand
		}
	});
}

export async function addModel(model: string, brandId: number) {
	return prisma.model.create({
		data: {
			name: model,
			brandId
		}
	});
}

export async function verifyBrand(brand: string) {
	return prisma.brand.findFirst({
		where: {
			name: brand
		}
	});
}

export async function verifyModel(model: string, brandId: number) {
	return prisma.model.findFirst({
		where: {
			name: model,
			brandId
		}
	});
}

export async function createListing(sellerId: number, listing: Omit<Listing, 'id' | 'sellerId' | 'createdAt' | 'updatedAt'>) {
	return prisma.listing.create({
		data: {
			sellerId,
			...listing
		}
	});
}

export async function updateListing(listing: Omit<Listing, 'createdAt' | 'updatedAt'>) {
	return prisma.listing.update({
		where: {
			id: listing.id
		},
		data: {
			...listing
		}
	});
}

export async function addImage(listingId: number, imageUrl: string) {
	return prisma.listingImage.create({
		data: {
			listingId,
			url: imageUrl
		}
	});
}

export async function deleteListing(id: number) {
	return prisma.listing.delete({
		where: {
			id
		}
	})
}
export type MakeOptional<T> = {
	[K in keyof T]?: T[K];
};

export type SearchListing = {
	sellerId?: number
	brandId?: number
	modelId?: number
	acceptsTrade?: boolean
	fuel?: string
	category?: string
	plateEnding?: number
	maxYear?: number
	minYear?: number
	maxPrice?: number
	minPrice?: number
	maxMileage?: number
	minMileage?: number
	state?: string
	city?: string
}
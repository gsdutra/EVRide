import prisma from "../../src/config/database";
import faker from "@faker-js/faker";
import { Category, Fuel } from "@prisma/client";

export function generateListingData(brandId: number, modelId: number) {
	return {
        brandId,
        modelId,
        year: faker.datatype.number({min: 1990, max: 2023}),
        mileage: faker.datatype.number(),
        price: faker.datatype.number(),
        fuel: Fuel.ELECTRIC,
        category: Category.CAR,
        plateEnding: faker.datatype.number({min: 0, max: 9}),
        state: faker.address.state(),
        city: faker.address.city(),
        description: faker.lorem.paragraph(),
        acceptsTrade: faker.datatype.boolean(),
        imagesArray: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()]
	}
}
import prisma from "../../src/config/database";
import faker from "@faker-js/faker";
import { Type } from "@prisma/client";

export async function generateUserData() {
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		type: 'personal',
		pictureUrl: faker.image.imageUrl(),
	}
}

export async function createUser() {
	return prisma.user.create({
		data: {
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			type: Type.PERSONAL,
			imageUrl: faker.image.imageUrl(),
		}
	})
}
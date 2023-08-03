import jwt from "jsonwebtoken";
import prisma from "../src/config/database";
import { User } from "@prisma/client";
import { createUser } from "./factories/user-factory";

export async function cleanDb() {
	await prisma.message.deleteMany();
	await prisma.listing.deleteMany();
	await prisma.chat.deleteMany();
	await prisma.listingImage.deleteMany();
	await prisma.model.deleteMany();
	await prisma.brand.deleteMany();
	await prisma.user.deleteMany();
}

export async function generateValidToken(user?: User) {
	const incomingUser = user || (await createUser());
	const token = jwt.sign({ id: incomingUser.id }, process.env.JWT_SECRET);
	return token;
  }
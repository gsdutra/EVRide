import prisma from '../config/database';
import { User, Type } from '@prisma/client';

export async function verifyUser(email: string) {
	return prisma.user.findUnique({
		where: {
			email
		}
	});
}

export async function createUser(email: string, password: string, name: string, type: string, imageUrl: string) {
	return prisma.user.create({
		data: {
			email,
			password,
			name,
			type: type === 'personal' ? Type.PERSONAL : Type.STORE,
			imageUrl
		}
	});
}
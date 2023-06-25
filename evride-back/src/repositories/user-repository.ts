import prisma from "../config/database";

export async function getUserData(id: number) {
	return prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			id: true,
			email: true,
			name: true,
			imageUrl: true,
			type: true,
			createdAt: true
		}
	})
}
import prisma from '../config/database';

export async function getChatsByUserIdAsSeller(userId: number) {
	return prisma.chat.findMany({
		where: {
			sellerId: userId
		},
		include: {
			listing: true,
			buyer: true
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});
}

export async function getChatsByUserIdAsBuyer(userId: number) {
	return prisma.chat.findMany({
		where: {
			buyerId: userId
		},
		include: {
			listing: true,
			seller: true
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});
}

export async function getChatsByUserId(userId: number) {
	return prisma.chat.findMany({
		where: {
			OR: [
				{buyerId: userId},
				{sellerId: userId}
			]
		},
		include: {
			listing: {
				include: {
					brand: true,
					model: true,
				}
			},
			buyer: true,
			seller: true
		},
		orderBy: {
			updatedAt: 'desc'
		}
	})
}

export async function getChatById(id: number) {
	return prisma.chat.findUnique({
		where: {
			id
		},
	});
}

export async function getMessagesByChatId(id: number) {
	return prisma.chat.findUnique({
		where: {
			id,
		},
		include: {
			messages: {
				orderBy: {
					createdAt: 'asc'
				}
			},
			buyer: {
				select: {
					id: true,
					name: true,
					imageUrl: true
				},
			},
			seller: {
				select: {
					id: true,
					name: true,
					imageUrl: true
				}
			},
			listing: {
				include: {
					brand: true,
					model: true,
				}
			}
		}
	});
}

export async function createMessage(message: string, chatId: number, senderId: number, receiverId: number) {
	return prisma.message.create({
		data: {
			message,
			chatId,
			senderId,
			receiverId
		}
	});
}

export async function updateChat(chatId: number) {
	return prisma.chat.update({
		where: {
			id: chatId
		},
		data: {
			updatedAt: new Date()
		}
	});
}

export async function createChat(listingId: number, buyerId: number, sellerId: number) {
	return prisma.chat.create({
		data: {
			listingId,
			sellerId,
			buyerId
		}
	});
}

export async function verifyChat(listingId: number, buyerId: number, sellerId: number) {
	return prisma.chat.findFirst({
		where: {
			listingId,
			sellerId,
			buyerId
		}
	});
}
import * as chatRepository from '../repositories/chat-repository';

export async function createChat(listingId: number, userId: number, sellerId: number) {
	if (userId === sellerId) throw { status: 400, message: 'Cannot create chat with yourself' };
	const verifyChat = await chatRepository.verifyChat(listingId, userId, sellerId);
	if (verifyChat) return verifyChat.id;
	const chat = await chatRepository.createChat(listingId, userId, sellerId);
	return chat.id
}

export async function getChatsByUserId(userId: number) {
	// const chatsAsSeller = await chatRepository.getChatsByUserIdAsSeller(userId);
	// const chatsAsBuyer = await chatRepository.getChatsByUserIdAsBuyer(userId);
	// return {chatsAsSeller, chatsAsBuyer};
	const chats = await chatRepository.getChatsByUserId(userId);
	let treatedChats: Array<object> = [];
	chats.forEach(chat => {
		const obj: any = {
			id: chat.id,
			name: chat.listing.brand.name + ' ' + chat.listing.model.name,
			updatedAt: chat.updatedAt,
		}
		if (chat.buyerId === userId) {
			obj.userName = chat.seller.name;
			obj.userImage = chat.seller.imageUrl;
		}
		if (chat.sellerId === userId) {
			obj.userName = chat.buyer.name;
			obj.userImage = chat.buyer.imageUrl;
		}
		treatedChats.push(obj);
	});

	return treatedChats;
}

export async function getMessagesByChatId(userId: number, chatId: number) {
	const chat = await chatRepository.getMessagesByChatId(chatId);
	if (!chat) throw { status: 404, message: 'Chat not found' };
	if (chat.buyerId !== userId && chat.sellerId !== userId) throw { status: 403, message: 'Forbidden' };
	if (chat.buyerId === userId) return {chat, as: 'buyer'};
	return {chat, as: 'seller'};
}

export async function createMessage(message: string, chatId: number, userId: number) {
	if (!message || message === "") throw { status: 400, message: 'Message cannot be empty' };
	const chat = await chatRepository.getChatById(chatId);
	if (!chat) throw { status: 404, message: 'Chat not found' };
	if (chat.buyerId !== userId && chat.sellerId !== userId) throw { status: 403, message: 'Forbidden' };
	const updateChat = await chatRepository.updateChat(chatId);
	return chatRepository.createMessage(message, chatId, userId, chat.buyerId === userId ? chat.sellerId : chat.buyerId);
}
import * as chatService from '../services/chat-service';
import { Request, Response } from 'express';

export async function getChatsByUserId(req: Request, res: Response) {
	try {
		const {userId} = res.locals;
		const response = await chatService.getChatsByUserId(userId);
		res.status(200).send(response);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function getMessages(req: Request, res: Response) {
	try {
		const {userId} = res.locals;
		const chatId = Number(req.params.chatId);
		const response = await chatService.getMessagesByChatId(userId, chatId);
		res.status(200).send(response);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function createMessage(req: Request, res: Response) {
	try {
		const {userId} = res.locals;
		const {message, chatId} = req.body;
		const response = await chatService.createMessage(message, Number(chatId), userId);
		res.sendStatus(201);
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}

export async function createChat(req: Request, res: Response) {
	try {
		const {userId} = res.locals;
		const {listingId, sellerId} = req.body;
		const response = await chatService.createChat(Number(listingId), userId, Number(sellerId));
		res.status(201).send({chatId: response});
	} catch (error) {
		res.status(error.status || 500).send(error.message || 'Internal Server Error');
	}
}
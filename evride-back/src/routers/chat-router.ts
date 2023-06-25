import * as chatController from '../controllers/chat-controller'
import { validateToken } from '../middlewares/validate-jwt-token'

import { Router } from 'express'

const chatRouter = Router()

chatRouter
	.get('/', validateToken, chatController.getChatsByUserId)
	.get('/:chatId', validateToken, chatController.getMessages)
	.post('/', validateToken, chatController.createChat)
	.post('/message', validateToken, chatController.createMessage);

export { chatRouter }
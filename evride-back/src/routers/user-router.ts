import { validateToken } from '../middlewares/validate-jwt-token'
import * as userController from '../controllers/user-controller'
import { Router } from 'express'

const userRouter = Router()

	userRouter.get('/', validateToken, userController.getUserData);

export {userRouter}
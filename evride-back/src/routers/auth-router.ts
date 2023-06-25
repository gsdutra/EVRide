import * as authController from '../controllers/auth-controller';
import { validateSignIn, validateSignUp } from '../middlewares/validate-auth';

import { Router } from 'express';

const authRouter = Router();

authRouter
	.post('/signup', validateSignUp, authController.createUser)
	.post('/signin', validateSignIn, authController.signIn);

export {authRouter};
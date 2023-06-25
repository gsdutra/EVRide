import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as authRepository from '../repositories/auth-repository';

export async function createUser(email: string, password: string, name: string, type: string, pictureUrl: string) {
	const verifyDuplicateUser = await authRepository.verifyUser(email);
	if (verifyDuplicateUser) throw { status: 409, message: 'User already exists' };

	const hashedPassword = await bcrypt.hash(password, 10);

	return authRepository.createUser(email, hashedPassword, name, type, pictureUrl);
}

export async function signIn(email: string, password: string) {
	const user = await authRepository.verifyUser(email);
	if (!user) throw { status: 404, message: 'User not found' };

	const isPasswordCorrect = bcrypt.compareSync(password, user.password);
	if (!isPasswordCorrect) throw { status: 401, message: 'Invalid credentials' };

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

	return token;
}
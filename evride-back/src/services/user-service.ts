import * as userRepository from '../repositories/user-repository'

export async function getUserData (userId: number) {
	const userData = await userRepository.getUserData(userId);
	return userData;
}
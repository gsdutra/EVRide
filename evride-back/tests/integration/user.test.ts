import supertest from 'supertest';
import app from "../../src/app";
import { cleanDb } from "../helpers";
import { generateValidToken } from '../helpers';

const server = supertest(app);

beforeEach(async ()=>{
	await cleanDb();
})

describe('GET /user', ()=>{
	it('should respond with status 200', async ()=>{
		const token = await generateValidToken();
		const response = await server.get('/user').set('x-access-token', token);
		expect(response.status).toBe(200);
	});
	it('should respond with status 401 if no token is provided', async ()=>{
		const response = await server.get('/user');
		expect(response.status).toBe(401);
	});
	it('should respond with status 403 if token is invalid', async ()=>{
		const response = await server.get('/user').set('x-access-token', 'invalid_token');
		expect(response.status).toBe(403);
	});
})
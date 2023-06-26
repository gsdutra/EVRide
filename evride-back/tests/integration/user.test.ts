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
	})
})
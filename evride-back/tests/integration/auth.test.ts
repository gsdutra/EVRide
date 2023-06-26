import { cleanDb } from "../helpers";
import { generateUserData } from "../factories/user-factory";
import supertest from 'supertest';
import app from "../../src/app";

const server = supertest(app);

beforeAll(async () => {
	await cleanDb();
});

describe("POST /auth/signup", () => {
	it("should respond with status 201", async () => {
		const user = await generateUserData();
		const response = await server.post("/auth/signup").send(user);
		expect(response.status).toBe(201);
	});
});

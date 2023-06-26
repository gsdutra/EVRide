import { cleanDb } from "../helpers";
import { createUser } from "../factories/user-factory";
import supertest from 'supertest';
import app from "../../src/app";

const server = supertest(app);

beforeAll(async () => {
	await cleanDb();
});

describe("GET /listing/", () => {
	it("should respond with status 200", async () => {
		const response = await server.get("/listing/");
		expect(response.status).toBe(200);
	});
});

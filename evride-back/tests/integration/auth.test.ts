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
	it("should respond with status 400 if body is invalid", async () => {
		const response = await server.post("/auth/signup").send();
		expect(response.status).toBe(400);
	});
	it("should respond with status 409 if user already exists", async () => {
		const user = await generateUserData();
		await server.post("/auth/signup").send(user);
		const response = await server.post("/auth/signup").send(user);
		expect(response.status).toBe(409);
	});
});

describe("POST /auth/signin", () => {
	it("should respond with status 200", async () => {
		const user = await generateUserData();
		await server.post("/auth/signup").send(user);
		const {email, password} = user;
		const response = await server.post("/auth/signin").send({email, password});
		expect(response.status).toBe(200);
	});
	it("should respond with status 400 if body is invalid", async () => {
		const response = await server.post("/auth/signin").send();
		expect(response.status).toBe(400);
	});
	it("should respond with status 400 if user does not exist", async () => {
		const user = await generateUserData();
		const response = await server.post("/auth/signin").send(user);
		expect(response.status).toBe(400);
	});
	it("should respond with status 400 if password is incorrect", async () => {
		const user = await generateUserData();
		await server.post("/auth/signup").send(user);
		const response = await server.post("/auth/signin").send({ ...user, password: "incorrect" });
		expect(response.status).toBe(400);
	});
});

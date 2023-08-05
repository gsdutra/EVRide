import { cleanDb } from "../helpers";
import { createUser } from "../factories/user-factory";
import supertest from 'supertest';
import app from "../../src/app";
import { generateListingData } from "../factories/listing-factory";
import { generateValidToken } from "../helpers";

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

describe("POST /listing/brands", () => {
	it("should respond with status 201", async () => {
		const token = await generateValidToken();
		const response = await server.post("/listing/brands").send({ brand: "Test Brand" }).set('x-access-token', token);
		expect(response.status).toBe(201);
	});
});

describe("POST /listing/models", () => {
	it("should respond with status 201", async () => {
		const token = await generateValidToken();
		const brand = await server.post("/listing/brands").send({ brand: "Test Brand" }).set('x-access-token', token);
		const response = await server.post("/listing/models").send({ model: "Test Model", brandId: brand.body.id }).set('x-access-token', token);
		expect(response.status).toBe(201);
	});
});

describe("POST /listing/", () => {
	it("should create listing and respond with status 201", async () => {
		const token = await generateValidToken();
		const brand = await server.post("/listing/brands").send({ brand: "Test Brand" }).set('x-access-token', token);
		const model = await server.post("/listing/models").send({ model: "Test Model", brandId: brand.body.id }).set('x-access-token', token);
		const response = await server.post("/listing/").send(generateListingData(brand.body.id, model.body.id)).set('x-access-token', token);
		expect(response.status).toBe(201);
	});
});

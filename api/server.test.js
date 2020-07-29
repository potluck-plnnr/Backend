const request = require("supertest");
const db = require("../data/config");
const server = require("./server");

describe("end point tests", function () {
	describe("POST /register and POST /login", function () {
		beforeAll(async () => {
			await db("users");
		});
		//test1

		it("POST /register - should return status 201", function () {
			request(server)
				.post("/register")
				.send({ username: "Andrew", password: "newtest123" })
				.then((res) => {
					expect(res.status).toBe(201);
				});
		});
		//     //test2
		it(" POST /register - res.type should match json", function () {
			request(server)
				.post("/register")
				.send({ username: "testjoe", password: "testjoe123" })
				.then((res) => {
					expect(res.type).toMatch(/json/i);
				});
		});
		//     //test3
		it("POST /login - should return status 200", function () {
			request(server)
				.post("/login")
				.send({ username: "testjoe", password: "testjoe123" })
				.then((res) => {
					expect(res.status).toBe(200);
				});
		});
		//     //test4
		it(' POST /login - res.type should match json"', function () {
			request(server)
				.post("/login")
				.send({ username: "testjoe", password: "testjoe123" })
				.then((res) => {
					expect(res.type).toMatch(/json/i);
				});
		});
		//test5
		it(" GET /potlucks/ - res.type should match json", function () {
			request(server)
				.get("/potlucks")
				.then((res) => {
					expect(res.type).toMatch(/json/i);
				});
		});
	});
});

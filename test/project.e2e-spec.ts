import * as request from "supertest";

const baseURL = process.env.TESTING_URL as unknown as string;

describe("Project e2e tests", () => {
    const apiRequest = request(baseURL);

    it("GET /projects", async () => {
        const response = await apiRequest.get("/projects");
        expect(response.status).toBe(200);
    })
})
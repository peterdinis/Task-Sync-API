import * as request from "supertest";

const baseURL = "http://localhost:3001";

describe("Project e2e tests", () => {
    const apiRequest = request(baseURL);

    it("GET /projects", async () => {
        const response = await apiRequest.get("/projects");
        expect(response.status).toBe(200);
    })
})
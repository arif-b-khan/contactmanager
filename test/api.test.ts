import request from "supertest";
import app from "../app/app";
import { Request, Response } from "express";

describe("GET /api", () => {
    it("should return 404 not found", () => {
        return request(app).get("/api")
        .expect(404);
    });
});

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/")
        .expect(200);
    });
});

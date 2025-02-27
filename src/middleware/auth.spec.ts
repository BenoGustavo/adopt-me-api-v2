import { FastifyRequest, FastifyReply } from "fastify";
import { authMiddleware } from "./auth";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("authMiddleware", () => {
    let request: Partial<FastifyRequest>;
    let reply: Partial<FastifyReply>;
    let done: jest.Mock;

    beforeEach(() => {
        request = {
            headers: {}
        };
        reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        done = jest.fn();
    });

    it("should return 401 if no token is provided", () => {
        authMiddleware(request as FastifyRequest, reply as FastifyReply, done);

        expect(reply.status).toHaveBeenCalledWith(401);
        expect(reply.send).toHaveBeenCalledWith({ error: "Token not provided" });
        expect(done).not.toHaveBeenCalled();
    });

    it("should return 401 if token is invalid", () => {
        request.headers = { authorization: "Bearer invalidtoken" };
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid token");
        });

        authMiddleware(request as FastifyRequest, reply as FastifyReply, done);

        expect(reply.status).toHaveBeenCalledWith(401);
        expect(reply.send).toHaveBeenCalledWith({ error: "Invalid token" });
        expect(done).not.toHaveBeenCalled();
    });

    it("should call done if token is valid", () => {
        const decodedToken = { id: 1, name: "Test User" };
        request.headers = { authorization: "Bearer validtoken" }; 
        (jwt.verify as jest.Mock).mockReturnValue(decodedToken);

        authMiddleware(request as FastifyRequest, reply as FastifyReply, done);

        expect(request.user).toEqual(decodedToken);
        expect(done).toHaveBeenCalled();
        expect(reply.status).not.toHaveBeenCalled();
        expect(reply.send).not.toHaveBeenCalled();
    });
});
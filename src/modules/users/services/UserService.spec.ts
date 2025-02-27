import { UserService } from "./UserService";
import { UserRepository } from "@/modules/users";
import { UserInvalidCredentialsError } from "@/errors/UserInvalidCredentialsError";
import { PasswordDontMatchError } from "@/errors/PasswordDontMatchError";
import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "@/env";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("UserService", () => {
    let userService: UserService;
    let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;
        userService = new UserService(userRepository);
    });

    describe("create", () => {
        it("should throw UserAlreadyExistsError if user already exists", async () => {
            userRepository.findByEmail.mockResolvedValue({ id: "1",name:"asdandiano" ,email: "test@example.com",city:"asdnasjdnas",password: "password" });

            await expect(userService.create({ name:"asdasdsaa",city:"asdmkafmoam" ,email: "test@example.com", password: "password", confirmPassword: "password" }))
                .rejects
                .toThrow(UserAlreadyExistsError);
        });

        it("should throw PasswordDontMatchError if passwords do not match", async () => {
            userRepository.findByEmail.mockResolvedValue(null);

            await expect(userService.create({ name:"ausdibads",city:"askdnsajdasjkldnasjl",email: "test@example.com", password: "password", confirmPassword: "different" }))
                .rejects
                .toThrow(PasswordDontMatchError);
        });

        it("should create a new user with hashed password", async () => {
            userRepository.findByEmail.mockResolvedValue(null);
            userRepository.create.mockResolvedValue({ id: "1",name:"asdandiano" ,email: "test@example.com",city:"asdnasjdnas" });
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

            const result = await userService.create({ name:"jkdnaskjdnas",city:"asdnainasioudauid",email: "test@example.com", password: "password", confirmPassword: "password" });

            expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
            expect(userRepository.create).toHaveBeenCalledWith({ name: "jkdnaskjdnas", city: "asdnainasioudauid", email: "test@example.com", password: "hashedPassword", confirmPassword: "password" });
            expect(result).toEqual({ id: "1", email: "test@example.com", city: "asdnasjdnas", name: "asdandiano" });
        });
    });

    describe("authenticate", () => {
        it("should throw UserInvalidCredentialsError if user does not exist", async () => {
            userRepository.findByEmail.mockResolvedValue(null);

            await expect(userService.authenticate("test@example.com", "password"))
                .rejects
                .toThrow(UserInvalidCredentialsError);
        });

        it("should throw UserInvalidCredentialsError if password is incorrect", async () => {
            userRepository.findByEmail.mockResolvedValue({ id: "1",name:"asdandiano" ,email: "test@example.com",city:"asdnasjdnas",password: "password" });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(userService.authenticate("test@example.com", "wrongPassword"))
                .rejects
                .toThrow(UserInvalidCredentialsError);
        });

        it("should return user with token if credentials are correct", async () => {
            userRepository.findByEmail.mockResolvedValue({ id: "1", email: "test@example.com", password: "password",city:"asdnasjdnas",name:"asdnasjdnas" });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue("token");

            const result = await userService.authenticate("test@example.com", "password");

            expect(jwt.sign).toHaveBeenCalledWith({ id: "1" }, env.JWT_SECRET!, { expiresIn: "1d" });
            expect(result).toEqual({ id: "1", email: "test@example.com", token: "token", city: "asdnasjdnas", name: "asdnasjdnas", password: undefined });
        });
    });
});
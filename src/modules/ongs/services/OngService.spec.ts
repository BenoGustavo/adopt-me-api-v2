import { OngService } from "./OngService";
import { PasswordDontMatchError, UserInvalidCredentialsError, UserAlreadyExistsError } from "@/errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IOngRepository } from "@/modules/ongs";
import { CreateOngDtoType } from "@/modules/ongs";

jest.mock("bcryptjs", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(),
}));

describe("OngService", () => {
    let ongRepository: jest.Mocked<IOngRepository>;
    let ongService: OngService;

    beforeEach(() => {
        ongRepository = {
            findByEmail: jest.fn(),
            create: jest.fn(),
        } as unknown as jest.Mocked<IOngRepository>;
        ongService = new OngService(ongRepository);
    });

    describe("create", () => {
        it("should throw UserAlreadyExistsError if user already exists", async () => {
            ongRepository.findByEmail.mockResolvedValue({ id: "1", name: "Test User", email: "test@example.com", whatsapp: "123456789", pets: [], password: "hashedPassword" });

            const data: CreateOngDtoType = {
                email: "test@example.com",
                password: "password",
                confirmPassword: "password",
                name: "NAME",
                address: {
                    number: 0,
                    street: "A",
                    city: "B",
                    state: "C"
                },
                whatsapp: "4899999999"
            };

            await expect(ongService.create(data)).rejects.toThrow(UserAlreadyExistsError);
        });

        it("should throw PasswordDontMatchError if passwords do not match", async () => {
            ongRepository.findByEmail.mockResolvedValue(null);

            const data: CreateOngDtoType = {
                email: "test@example.com",
                password: "password",
                confirmPassword: "differentPassword",
                name: "NAME",
                address: {
                    number: 0,
                    street: "A",
                    city: "B",
                    state: "C"
                },
                whatsapp: "489999999999"
            };

            await expect(ongService.create(data)).rejects.toThrow(PasswordDontMatchError);
        });

        it("should create a new user with hashed password", async () => {
            ongRepository.findByEmail.mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
            ongRepository.create.mockResolvedValue({ id: "1", name: "Test User", email: "test@example.com", whatsapp: "123456789", address: { number: 0, street: "A", city: "B", state: "C", id: "1", created_at: new Date(), updated_at: new Date() }, password: "hashedPassword" } as any);

            const data: CreateOngDtoType = {
                email: "test@example.com",
                password: "password",
                confirmPassword: "password",
                name: "",
                address: {
                    number: 0,
                    street: "A",
                    city: "B",
                    state: "C"
                },
                whatsapp: ""
            };

            const result = await ongService.create(data);

            expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
            expect(ongRepository.create).toHaveBeenCalledWith({ ...data, password: "hashedPassword" });
            expect(result).toEqual({
                id: "1",
                email: "test@example.com",
                password: "hashedPassword",
                name: "Test User",
                whatsapp: "123456789",
                address: {
                    number: 0,
                    street: "A",
                    city: "B",
                    state: "C",
                    id: "1",
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date)
                }
            });
        });
    });

    describe("authenticate", () => {
        it("should throw UserInvalidCredentialsError if user does not exist", async () => {
            ongRepository.findByEmail.mockResolvedValue(null);

            await expect(ongService.authenticate("test@example.com", "password")).rejects.toThrow(UserInvalidCredentialsError);
        });

        it("should throw UserInvalidCredentialsError if password is incorrect", async () => {
            ongRepository.findByEmail.mockResolvedValue({ id: "1",name: "name",whatsapp:"48999999",pets: null ,email: "test@example.com", password: "hashedPassword" });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(ongService.authenticate("test@example.com", "password")).rejects.toThrow(UserInvalidCredentialsError);
        });

        it("should return user with token if credentials are correct", async () => {
            const user = { id: "1", name: "Test User", email: "test@example.com", whatsapp: "123456789", pets: [], password: "hashedPassword" };
            ongRepository.findByEmail.mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue("token");

            const result = await ongService.authenticate("test@example.com", "password");

            expect(jwt.sign).toHaveBeenCalledWith({ id: user.id }, expect.any(String), { expiresIn: "1d" });
            expect(result).toEqual({ ...user, token: "token", password: undefined });
        });
    });
});
import { UnautorizedError } from "@/errors/UnautorizedError";
import { OngRepository } from "@/modules/ongs";
import { UserRepository } from "@/modules/users";
import { PetSize, PetType, PrismaClient } from "@prisma/client";
import { PetRepository } from "../repositories/prisma/PetRepository";
import { PetService } from "./PetService";

jest.mock("../repositories/prisma/PetRepository");
jest.mock("@/modules/ongs");
jest.mock("@/modules/users");

describe("PetService", () => {
	let petService: PetService;
	let petRepository: jest.Mocked<PetRepository>;
	let ongRepository: jest.Mocked<OngRepository>;
	let userRepository: jest.Mocked<UserRepository>;

	beforeEach(() => {
		const prismaClient = {} as PrismaClient; // Mock PrismaClient
		petRepository = new PetRepository(
			prismaClient,
		) as jest.Mocked<PetRepository>;
		ongRepository = new OngRepository(
			prismaClient,
		) as jest.Mocked<OngRepository>;
		userRepository = new UserRepository(
			prismaClient,
		) as jest.Mocked<UserRepository>;
		petService = new PetService(
			petRepository,
			ongRepository,
			userRepository,
		);
	});

	describe("create", () => {
		it("should create a pet if ong exists", async () => {
			const ongId = "ong-id";
			const data = { name: "Pet" } as any;
			ongRepository.findById.mockResolvedValue({
				id: ongId,
				name: "Ong",
				email: "asdasda@gmail.com",
				addressId: "address-id",
				created_at: new Date(),
				updated_at: new Date(),
				whatsapp: "123456789",
				password: "2342424234",
			});
			petRepository.create.mockResolvedValue(data);

			const result = await petService.create(ongId, data);

			expect(result).toEqual(data);
			expect(ongRepository.findById).toHaveBeenCalledWith(ongId);
			expect(petRepository.create).toHaveBeenCalledWith(
				{
					id: ongId,
					name: "Ong",
					email: "asdasda@gmail.com",
					addressId: "address-id",
					created_at: expect.any(Date),
					updated_at: expect.any(Date),
					whatsapp: "123456789",
					password: "2342424234",
				},
				data,
			);
		});

		it("should throw UnauthorizedError if ong does not exist", async () => {
			const ongId = "ong-id";
			const data = { name: "Pet" } as any;
			ongRepository.findById.mockResolvedValue(null);

			await expect(petService.create(ongId, data)).rejects.toThrow(
				UnautorizedError,
			);
		});
	});

	describe("findById", () => {
		it("should find a pet by id", async () => {
			const petId = "pet-id";
			const pet = { id: petId } as any;
			petRepository.findPetById.mockResolvedValue(pet);

			const result = await petService.findById(petId);

			expect(result).toEqual(pet);
			expect(petRepository.findPetById).toHaveBeenCalledWith(petId);
		});
	});

	describe("findPets", () => {
		it("should find pets with filters", async () => {
			const city = "city";
			const size = PetSize.PEQUENO;
			const age = 2;
			const breed = "breed";
			const type = PetType.CACHORRO;
			const pets = [{ id: "pet-id" }] as any;
			petRepository.findWithFilters.mockResolvedValue(pets);

			const result = await petService.findPets(
				city,
				size,
				age,
				breed,
				type,
			);

			expect(result).toEqual(pets);
			expect(petRepository.findWithFilters).toHaveBeenCalledWith(
				city,
				size,
				age,
				breed,
				type,
			);
		});
	});

	describe("adoptPet", () => {
		it("should adopt a pet if user and ong exist", async () => {
			const petId = "pet-id";
			const userId = "user-id";
			const ongId = "ong-id";
			const user = { id: userId } as any;
			const ong = { id: ongId } as any;
			userRepository.findById.mockResolvedValue(user);
			ongRepository.findById.mockResolvedValue(ong);
			petRepository.toggleAdoptionStatus.mockResolvedValue({
				id: petId,
				name: "Pet",
				age: 2,
				breed: "Breed",
				city: "City",
				size: PetSize.PEQUENO,
				type: PetType.CACHORRO,
				ongId: "ong-id",
				created_at: new Date(),
				updated_at: new Date(),
				is_adopted: true,
				userId: "user-id",
				description: "Description",
			});

			await petService.adoptPet(petId, userId, ongId);

			expect(userRepository.findById).toHaveBeenCalledWith(userId);
			expect(ongRepository.findById).toHaveBeenCalledWith(ongId);
			expect(petRepository.toggleAdoptionStatus).toHaveBeenCalledWith(
				petId,
				userId,
			);
		});

		it("should throw UnauthorizedError if user does not exist", async () => {
			const petId = "pet-id";
			const userId = "user-id";
			const ongId = "ong-id";
			userRepository.findById.mockResolvedValue(null);

			await expect(
				petService.adoptPet(petId, userId, ongId),
			).rejects.toThrow(UnautorizedError);
		});

		it("should throw UnauthorizedError if ong does not exist", async () => {
			const petId = "pet-id";
			const userId = "user-id";
			const ongId = "ong-id";
			const user = { id: userId } as any;
			userRepository.findById.mockResolvedValue(user);
			ongRepository.findById.mockResolvedValue(null);

			await expect(
				petService.adoptPet(petId, userId, ongId),
			).rejects.toThrow(UnautorizedError);
		});
	});

	describe("getAdoptedPets", () => {
		it("should get adopted pets if ong exists", async () => {
			const ongId = "ong-id";
			const ong = { id: ongId } as any;
			const pets = [{ id: "pet-id" }] as any;
			ongRepository.findById.mockResolvedValue(ong);
			petRepository.getAdoptedPets.mockResolvedValue(pets);

			const result = await petService.getAdoptedPets(ongId);

			expect(result).toEqual(pets);
			expect(ongRepository.findById).toHaveBeenCalledWith(ongId);
			expect(petRepository.getAdoptedPets).toHaveBeenCalled();
		});

		it("should throw UnautorizedError if ong does not exist", async () => {
			const ongId = "ong-id";
			ongRepository.findById.mockResolvedValue(null);

			await expect(petService.getAdoptedPets(ongId)).rejects.toThrow(
				UnautorizedError,
			);
		});
	});

	describe("deletePet", () => {
		it("should delete a pet if ong exists", async () => {
			const petId = "pet-id";
			const ongId = "ong-id";
			const ong = { id: ongId } as any;
			ongRepository.findById.mockResolvedValue(ong);
			petRepository.deletePet.mockResolvedValue({
				id: petId,
				name: "Pet",
				age: 2,
				breed: "Breed",
				city: "City",
				size: PetSize.PEQUENO,
				type: PetType.CACHORRO,
				ongId: "ong-id",
				created_at: new Date(),
				updated_at: new Date(),
				is_adopted: true,
				userId: "user-id",
				description: "Description",
			});

			const result = await petService.deletePet(petId, ongId);

			expect(result).toEqual({
				id: petId,
				name: "Pet",
				age: 2,
				breed: "Breed",
				city: "City",
				size: PetSize.PEQUENO,
				type: PetType.CACHORRO,
				ongId: "ong-id",
				created_at: expect.any(Date),
				updated_at: expect.any(Date),
				is_adopted: true,
				userId: "user-id",
				description: "Description",
			});
			expect(ongRepository.findById).toHaveBeenCalledWith(ongId);
			expect(petRepository.deletePet).toHaveBeenCalledWith(petId);
		});

		it("should throw UnautorizedError if ong does not exist", async () => {
			const petId = "pet-id";
			const ongId = "ong-id";
			ongRepository.findById.mockResolvedValue(null);

			await expect(petService.deletePet(petId, ongId)).rejects.toThrow(
				UnautorizedError,
			);
		});
	});
});

import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateUserDtoType } from "../../dtos/UserDTO";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

	async create(data: CreateUserDtoType) {
		//Creates a new user
		const newUserModel: Omit<User, "id"> = {
			name: data.name,
			email: data.email,
			city: data.city,
			password: data.password,
			created_at: new Date(),
			updated_at: new Date(),
		};

		const user = await this.prisma.user.create({
			data: newUserModel,
			select: {
				id: true,
				name: true,
				email: true,
				city: true,
			},
		});

		return user;
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				name: true,
				email: true,
				city: true,
				password: true,
			},
		});
	}

	async findById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				city: true,
				password: false,
			},
		});
	}
}

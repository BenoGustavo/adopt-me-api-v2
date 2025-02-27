import { CreateUserDtoType } from "../../dtos/UserDTO";

export interface IUserRepository {
	create(
		data: CreateUserDtoType,
	): Promise<{ id: string; name: string; email: string; city: string }>;
	findByEmail(
		email: string,
	): Promise<{
		id: string;
		name: string;
		email: string;
		city: string;
		password: string;
	} | null>;
	findById(
		id: string,
	): Promise<{
		id: string;
		name: string;
		email: string;
		city: string;
	} | null>;
}

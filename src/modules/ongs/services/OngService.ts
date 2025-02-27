import { env } from "@/env";
import {
	PasswordDontMatchError,
	UserAlreadyExistsError,
	UserInvalidCredentialsError,
} from "@/errors";
import { CreateOngDtoType, IOngRepository } from "@/modules/ongs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class OngService {
	constructor(private ongRepository: IOngRepository) {}

	async create(data: CreateOngDtoType) {
		const user = await this.ongRepository.findByEmail(data.email);
		if (user) {
			throw new UserAlreadyExistsError();
		}

		if (data.password !== data.confirmPassword) {
			throw new PasswordDontMatchError();
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);
		return this.ongRepository.create({ ...data, password: hashedPassword });
	}

	async authenticate(email: string, password: string) {
		const ong = await this.ongRepository.findByEmail(email);
		if (!ong || !(await bcrypt.compare(password, ong.password))) {
			throw new UserInvalidCredentialsError("Invalid credentials");
		}
		const token = jwt.sign({ id: ong.id }, env.JWT_SECRET!, {
			expiresIn: "1d",
		});
		return { ...ong, token, password: undefined };
	}
}

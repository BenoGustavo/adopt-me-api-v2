/**
 * This file is responsible for loading the environment variables and validating them.
 */

import { InvalidEnvironmentVariablesError } from "@/errors/InvalidEnvironmentVariablesError";
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string(),
	DATABASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error(
		"❌ Invalid environment variables ❌:\n",
		_env.error.format(),
	);

	throw new InvalidEnvironmentVariablesError(
		"Invalid environment variables, check your .env file.",
	);
}

export const env = _env.data;

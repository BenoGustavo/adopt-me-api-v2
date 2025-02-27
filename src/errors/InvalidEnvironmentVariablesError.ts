export class InvalidEnvironmentVariablesError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidEnvironmentVariablesError";
	}
}

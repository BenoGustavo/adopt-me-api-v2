export class UserInvalidCredentialsError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "UserInvalidCredentialsError";
    }
}
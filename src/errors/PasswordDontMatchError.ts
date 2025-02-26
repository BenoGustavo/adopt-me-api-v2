export class PasswordDontMatchError extends Error{
    constructor(){
        super("Password and password confirmation must match");
        this.name = "PasswordDontMatchError";
    }
}
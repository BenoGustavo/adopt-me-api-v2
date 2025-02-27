export class Response {
    status: number;
    message: string;
    data: object | null;
    error?: object | string | null;
    
    constructor(status: number, message: string, data: object | null, error?: object | string | null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
export class HttpException extends Error {
    constructor(
        public readonly message: string,
        public readonly status: number,
    ) {
        super(message)
    }
}
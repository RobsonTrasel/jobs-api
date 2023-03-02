import { HttpException } from "@/shared/errors/http-exception";

describe('[HTTP] Exception test for HTTP', () => {
    it('should create a new exception for HttpException', () => {
        const message = "This a error test message"
        const status = 400
        const exception = new HttpException(message, status)

        expect(exception).toBeInstanceOf(HttpException)
        expect(exception.message).toBe(message)
        expect(exception.status).toBe(status)
    })
})
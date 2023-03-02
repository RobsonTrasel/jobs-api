import { ValidationException } from '@/shared/errors/validation-exception';

describe('[Validation] Exception test for Validation', () => {
    it('should create a new exception for ValidationException', () => {
        const message = "This a error test message"
        const exception = new ValidationException(message)

        expect(exception).toBeInstanceOf(ValidationException)
        expect(exception.message).toBe(message)
    })
})
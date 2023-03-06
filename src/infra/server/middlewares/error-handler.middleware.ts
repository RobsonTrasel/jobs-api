import { Request, Response, NextFunction } from "express";
import { HttpException } from '../../../shared/errors/http-exception';


export const errorHandler = (
    error: Error | HttpException,
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const status = error instanceof HttpException ? error.status : 500
    const message = error.message || 'Something went wrong'

    response.status(status).json({
        message, status
    })
    
}

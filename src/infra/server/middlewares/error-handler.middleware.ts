import { Request, Response, NextFunction } from "express";
import { HttpException } from "@/shared/errors/http-exception";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const status = error.status || 500
    const message = error.message || 'Something went wrong'

    response.status(status).json({
        message, status
    })
}

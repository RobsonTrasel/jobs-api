import { Request, Response } from "express";
import { errorHandler } from "@/infra/server/middlewares/error-handler.middleware";
import { HttpException } from "@/shared/errors/http-exception";

describe("[Error] test the error handler", () => {
  it("should return status 500 and error message on server error", () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockError = new Error("Internal server error");

    errorHandler(mockError, {} as Request, mockResponse, jest.fn());
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal server error",
      status: 500,
    });
  });

  it("should return 404 and error message on not found error", () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockError = new HttpException("Not Found", 404);

    errorHandler(mockError, {} as Request, mockResponse, jest.fn());

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Not Found",
      status: 404,
    });
  });
});

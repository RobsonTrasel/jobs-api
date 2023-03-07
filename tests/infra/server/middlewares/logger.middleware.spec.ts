import { Request, Response } from "express";
import { loggerHandler } from "@/infra/server/middlewares/logger.middleware";

describe("[Logger] test for the logger middleware", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log the request method and path", () => {
    const mockRequest = {
      method: "GET",
      url: "/test",
    } as unknown as Request;

    const mockResponse = {
      on: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn();

    loggerHandler(mockRequest, mockResponse, mockNext);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      `${mockRequest.method} ${mockRequest.url}`
    );
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});

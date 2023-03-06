import { PrismaClient } from "@prisma/client";
import config from "@/infra/shared/database/config";

describe('[Database] tests for config of Prisma', () => {
    it('should return a Prisma client instance', () => {
        expect(config).toBeInstanceOf(PrismaClient)
    })
})
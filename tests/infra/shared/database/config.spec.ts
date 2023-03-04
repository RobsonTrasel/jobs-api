import sequelize from "@/infra/shared/database/config";

describe('[Sequelize] test the connection', () => {
    it('should be able to connect to the database', async () => {
        await expect(sequelize.authenticate()).resolves.toBeUndefined()
    })
})
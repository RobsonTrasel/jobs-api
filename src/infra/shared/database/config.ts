import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
config()

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_LOCALHOST,
    port: 5432,
    database: process.env.DB_LOCAL_DB,
    username: process.env.DB_LOCAL_NAME,
    password: process.env.DB_LOCAL_PASSWORD,
    logging: false,
})

export default sequelize
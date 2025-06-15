import { Sequelize } from 'sequelize'
import { configDotenv } from 'dotenv'

configDotenv()

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
})

export default sequelize
import { Sequelize } from 'sequelize'
import { configDotenv } from 'dotenv'

configDotenv()

const sequelize = new Sequelize('codeuni', 'doadmin', 'AVNS_wXC94p4UIA6p4cL5wcd', {
    host: 'dynamic-db-do-user-14018578-0.c.db.ondigitalocean.com',
    port: 25060,
    dialect: 'mysql'
})

export default sequelize
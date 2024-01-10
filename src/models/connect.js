import { Sequelize } from "sequelize"

const sequelize = new Sequelize('db_food', 'root', '12345678', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
})

export default sequelize

//npx sequelize-auto -h localhost -d db_food -u root -x 12345678 -p 3307 --dialect mysql -o src/models -l esm
import { Sequelize } from "sequelize";

const db = new Sequelize('valcal','iot_prod','123456',{
    host: 'localhost',
    dialect: 'mysql',
});

export default db;
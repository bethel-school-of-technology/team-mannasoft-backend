import { Sequelize } from "sequelize";
import { UserFactory } from "./user";

require('dotenv').config()
console.log(process.env)

// Create a database with this name.
const dbName = 'legalEasedb';
const username = 'root';
// Add your own password that you chose for your mysql
const password = process.env.DBPASSWORD;

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);

export const db = sequelize;
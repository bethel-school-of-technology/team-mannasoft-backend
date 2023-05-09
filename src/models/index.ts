import { Sequelize } from "sequelize";
import { UserFactory } from "./user";

const dbName = 'legalEaseDB';
const username = 'root';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);

export const db = sequelize;
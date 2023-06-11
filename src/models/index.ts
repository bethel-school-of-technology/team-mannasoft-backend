import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { 
   AssociateUserFile, 
   FileFactory 
} from "./file";

require("dotenv").config();

const dbName: any = process.env.DBNAME;
// const dbName: any = "legalEasedb";
const username = "root";
const password = process.env.DBPASSWORD;

const sequelize = new Sequelize(dbName, username, password, {
   host: "127.0.0.1",
   port: 3306,
   dialect: "mysql",
});

FileFactory(sequelize);
UserFactory(sequelize);
AssociateUserFile();

export const db = sequelize;

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class File extends Model<InferAttributes<File>,InferCreationAttributes<File>> {
   declare fileId: number;
   declare description?: string;
   declare fileName: string;
   declare storedName: string;
   declare hash: string;
   declare userId: number;
   declare createdAt?: Date;
   declare updatedAt?: Date;
}

export function FileFactory(sequelize: Sequelize) {
   File.init(
      {
         fileId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         description: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         fileName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         storedName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         hash: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         tableName: "dbfile",
         freezeTableName: true,
         sequelize,
      }
   );
}

export function AssociateUserFile() {
   User.hasMany(File, { foreignKey: "userId" });
   File.belongsTo(User, { foreignKey: "userId" });
}

import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class File extends Model<InferAttributes<File>, InferCreationAttributes<File>> {
    declare fileId: number;
    declare description: string;
    declare file: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function FileFactory(sequelize: Sequelize) {
    File.init({
        fileId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'file',
        freezeTableName: true,
        sequelize
    }
    );
}

export function AssociateUserFile() {
    User.hasMany(File, { foreignKey: 'userId' });
    File.belongsTo(User, { foreignKey: 'userId' });
}
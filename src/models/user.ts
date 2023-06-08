import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare userId: number;
    declare username: string;
    declare password: string;
    declare phoneNumber?: string;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare streetName: string;
    declare city: string;
    declare state: string;
    declare country: string;
    declare bank?: string;
    declare license?: string;
    declare socialSecurityNumber?: string;
    declare birthCertificate?: string;
    declare passportNumber?: string;
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        streetName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank: {
            type: DataTypes.STRING,
            allowNull: true
        },
        license: {
            type: DataTypes.STRING,
            allowNull: true
        },
        socialSecurityNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthCertificate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        passportNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
        {
            tableName: 'userDB',
            freezeTableName: true,
            sequelize
        }
    );
}

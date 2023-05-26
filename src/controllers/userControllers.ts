import { RequestHandler } from "express-serve-static-core";
import { User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from '../services/auth';

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;

    if (newUser.username && newUser.password) {
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
};

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    });

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (user) {
        let { username, firstName, lastName, email, phoneNumber } = user;
        res.status(200).json({
            username,
            firstName,
            lastName,
            email,
            phoneNumber
        });
    }
    else {
        res.status(401).send();
    }
}

export const editUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    };

    let userId = req.params.userId;
    let newUser: User = req.body;

    let userFound = await User.findByPk(userId);

    console.log(newUser)

    if (userFound && userFound.userId == user.userId && newUser.username && newUser.email) {
        if (newUser.password && newUser.password !== '') {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
        } else {
            newUser.password = userFound.password;
        }

        await User.update(newUser, {
            where: { userId: userId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    };
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    };

    let userId = req.params.userId;
    let userFound = await User.findByPk(userId);

    if (userFound) {
        await User.destroy({
            where: { userId: userId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    };
};
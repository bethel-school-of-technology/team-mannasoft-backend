import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const secret = 'May the Force be with you.';

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 12; //how long the hashed password is
    const hash = await bcrypt.hash(plainTextPassword, saltRound); //hashes the password using the saltround
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}//compares the password against the plain text password

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        { userId: user.userId },
        secret,
        { expiresIn: '24hr' }
    );
    //uses the token to signin the user with the userId and secret.
    return token;
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;
    //requsets the auth header

    //if the header exists, parse token from `Bearer <token>`
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        // Verify the token and gets the user
        try {
            let decoded: any = await jwt.verify(token, secret);
            return User.findByPk(decoded.userId);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
}
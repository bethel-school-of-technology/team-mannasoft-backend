import { RequestHandler } from 'express-serve-static-core';
import { User } from '../models/user';
import { comparePasswords, hashPassword, signUserToken, verifyUser } from '../services/auth';

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;  //requests the user and sets it as the new user

    if (newUser.username && newUser.password) { 
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
        //if the username and passoword are populated, hash the passoword and create a user. Send status 201 to show 
        //it has been created with a username and id.
    } else {
        res.status(400).send('Username and password required');
    }  //if the username and password are not populated, send a 400 status code (not authenticated)
};

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({
        where: { username: req.body.username }
    }); // if there is no user, find the user by username and set it to the existing user

    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
//if existingUser exists, compare the original password against the existing password(what was inputed)
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
            //send token with a status code 200
        } else {
            res.status(401).json('Invalid password');
        }
    } else {
        res.status(401).json('Invalid username');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
    //verify user by requsting the user
    if (user) {
        let { userId, username, firstName, lastName, email, phoneNumber } = user
        res.status(200).json ({
            userId,
            username,
            firstName,
            lastName,
            email,
            phoneNumber
        })
        //if the user exists, show the username, first name, last name, email, and phone number
    } else {
        res.status(401).json();
    };
}

export const editUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }; //if there is no user, return error message 403 (forbidden)

    let userId = req.params.userId; //let the userId request the userId parameter
    let newUser: User = req.body; //new User is the User
    let userFound = await User.findByPk(userId); //find the user by the userId
    console.log(newUser)
    if (userFound && userFound.userId == user.userId && newUser.username && newUser.email && newUser.phoneNumber) {
        //if the userId is found, allow the username, email and phone number to be updated
        if (newUser.password && newUser.password !== '') {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
        //if the password is the same as the old password, allow the other fields to be updated. (authenticates the edit user)
        } else {
            newUser.password = userFound.password;
        } //
        await User.update(newUser, {
            where: { userId: userId }
        }); //updates the user by the id
        res.status(200).json();
    } else {
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
        //if a user is found, then delete it by its id
    } else {
        res.status(404).json();
    };
};

const invalidatedTokens: string[] = [];

export const signOutUser: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req);
  if (!user) {
      return res.status(403).send();
  };
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token is already invalidated
  if (token && invalidatedTokens.includes(token)) {
    return res.status(401).json('Token has already been invalidated');
  }

  // Add the token to the list of invalidated tokens
  if (token) {
    invalidatedTokens.push(token);
  }

  res.status(200).json('User signed out successfully');
};

export const verify: RequestHandler = async (req, res, next) => {
    let result = await verifyUser(req);
    console.log(result);
    if (result) {
        res.status(200).json(result.dataValues);
    } else {
        res.status(200).json(false);
    };
};

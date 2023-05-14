import { RequestHandler } from "express";
import { File } from "../models/file";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getFiles: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
    if (!user) {
        return res.status(403).send();
    };
    let files = await File.findAll();
    res.status(200).json(files);
}

export const createFile: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
    if (!user) {
        return res.status(403).send();
    };
    let newFile: File = req.body;
    newFile.userId = user.userId
    if (newFile.file && newFile.description) {
        let created = await File.create(newFile);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getOneFile: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
    if (!user) {
        return res.status(403).send();
    };
    let fileId = req.params.fileId;
    let fileFound = await File.findByPk(fileId);
    if (fileFound) {
        res.status(200).json(fileFound);
    }
    else {
        res.status(404).json({});
    };
}

export const editFile: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    };

    let fileId = req.params.fileId;
    let newFile: File = req.body;
    
    let fileFound = await File.findByPk(fileId);
    
    if (fileFound && fileFound.fileId == newFile.fileId && newFile.file && newFile.description) {
            await File.update(newFile, {
                where: { fileId: fileId }
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    };
};

export const deleteFile: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    };

    let fileId = req.params.fileId;
    let fileFound = await File.findByPk(fileId);
    
    if (fileFound) {
        await File.destroy({
                where: { fileId: fileId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    };
};
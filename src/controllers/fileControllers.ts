import { RequestHandler } from "express";
import { File } from "../models/file";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";
import * as path from 'path';

export const getFiles: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
    if (!user) {
        return res.status(403).send();
    };
    let files = await File.findAll({ where: { userId: user.userId } });
    res.status(200).json(files);
}

export const createFile: RequestHandler = async (req: any, res, next) => {
    let user: User | null = await verifyUser(req)
    if (!user) {
        return res.status(403).send();
    };
    const file = req.file;
    console.log(file);
    if (file) {
        let newFile: File = req.body;
        newFile.userId = user.userId
        newFile.storedName = file.filename
        newFile.fileName = file.originalname
        newFile.createdAt = newFile.updatedAt = new Date();
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

export const downloadOneFile: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req)
    if (!user) {
        return res.status(403).send();
    };
    let fileId = req.params.fileId;
    let fileFound = await File.findOne({ where: { storedName: fileId } });
    if (fileFound) {
        res.set("Content-Disposition", `attachment; filename="${fileFound.fileName}"`);
        res.sendFile(path.join(__dirname, '../../userFiles/', fileFound.storedName));
    }
    else {
        res.status(404).send('File does not exist');
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
    if (fileFound && fileFound.fileId == newFile.fileId && newFile.fileName && newFile.description) {
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
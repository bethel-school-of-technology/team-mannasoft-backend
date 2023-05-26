const express = require('express')
import { createFile, getFiles, getOneFile, editFile, deleteFile, downloadOneFile } from "../controllers/fileControllers";
const multer = require('multer')
const upload = multer({ dest: 'userFiles/' })

const apps = express()

apps.get('/', getFiles);
apps.post('/', upload.single('file'), createFile);
apps.get('/:fileId', getOneFile);
apps.get('/download/:fileId', downloadOneFile);
apps.put('/:fileId', editFile);
apps.delete('/:fileId', deleteFile)

export default apps; 
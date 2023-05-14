import { Router } from "express";
import { createFile, getFiles, getOneFile, editFile, deleteFile } from "../controllers/fileControllers";

const router = Router();

router.get('/', getFiles);
router.post('/', createFile);
router.get('/:fileId', getOneFile);
router.put('/:fileId', editFile);
router.delete('/:fileId', deleteFile)

export default router; 
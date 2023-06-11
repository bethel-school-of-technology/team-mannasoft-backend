import { Router } from "express";
import {
   createFile,
   getFiles,
   getOneFile,
   editFile,
   deleteFile,
   downloadOneFile,
} from "../controllers/fileControllers";

const multer = require("multer");
const upload = multer({ dest: "userFiles/" });

const router = Router();

router.get("/:fileId", getOneFile);
router.get("/download/:fileId", downloadOneFile);
router.put("/:fileId", editFile);
router.delete("/:fileId", deleteFile);
router.get("/", getFiles);
router.post("/", upload.single("file"), createFile);

export default router;

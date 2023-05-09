import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/userControllers";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);

export default router;
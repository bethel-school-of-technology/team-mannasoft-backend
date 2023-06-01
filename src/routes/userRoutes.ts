import { Router } from "express";
import { createUser, getUser, loginUser, editUser, deleteUser } from "../controllers/userControllers";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:userId', editUser);
router.delete('/:userId', deleteUser);
router.get('/:userId', getUser);

export default router; 
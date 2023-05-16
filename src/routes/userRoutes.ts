import { Router } from "express";
import { createUser, getUser, loginUser, editUser, deleteUser } from "../controllers/userControllers";

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);
router.put('/:userId', editUser);
router.delete('/:userId', deleteUser);

export default router; 
import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get("/", usersController.getUsers);
router.get("/:userid", usersController.getUserByUserID);
router.post("/", usersController.createUser);
router.put("/:userid", usersController.updateUser);
router.delete("/:userid", usersController.deleteUser);


export default router;
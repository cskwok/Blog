import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import Auth from '../helper/auth.js'

const router = Router();

router.get("/", Auth.auth, usersController.getUsers);
router.get("/:userid", Auth.auth, usersController.getUserByUserID);
router.post("/", usersController.createUser);
router.put("/:userid", Auth.auth, usersController.updateUser);
router.delete("/:userid", Auth.auth, usersController.deleteUser);


export default router;
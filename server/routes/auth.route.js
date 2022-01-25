import { Router } from 'express';
import Auth from '../helper/auth.js'
import authController from '../controllers/auth.controller.js';

const router = Router();

router.get("/", (req,res)=>Auth.auth(req, res));
router.post("/", authController.login);
router.delete("/", Auth.auth, authController.logout);

export default router;
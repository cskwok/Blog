import { Router } from 'express';

import users from './users.route.js';
import posts from './posts.route.js';
import auth from './auth.route.js';

const router = Router();

router.use("/users", users);
router.use("/posts", posts);
router.use("/auth", auth);

export default router;
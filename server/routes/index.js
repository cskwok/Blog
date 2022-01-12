import { Router } from 'express';

import users from './users.route.js';
import posts from './posts.route.js';

const router = Router();

router.use("/users", users);
router.use("/posts", posts);

export default router;
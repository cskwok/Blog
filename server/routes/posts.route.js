import { Router } from 'express';
import postsController from '../controllers/posts.controller.js';
import Auth from '../helper/auth.js'

const router = Router();

router.get("/", postsController.getPosts);
router.get("/:postid", postsController.getPostByPostID);
router.get("/users/:userid", postsController.getPostsByUserID);
router.post("/", Auth.auth, postsController.createPost);

export default router;
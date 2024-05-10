import express from "express";
import { verifyAuth } from "../middleware/auth";
import { addPost, getAllPosts } from "../controllers/post.controller";

const router = express.Router();

router.post('/create', [verifyAuth], addPost);
router.get('/', [verifyAuth], getAllPosts);


export default router
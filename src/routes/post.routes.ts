import express from "express";
import { verifyAuth } from "../middleware/auth";
import { addPost } from "../controllers/post.controller";
import upload from "../middleware/file-upload";
const router = express.Router();

router.post('/create', [verifyAuth,upload.array('media[]')], addPost);

export default router
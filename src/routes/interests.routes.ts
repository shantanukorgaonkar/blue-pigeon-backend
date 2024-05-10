import express from "express";
import { getAllInterests } from "../controllers/interests.controller";

const router = express.Router();

router.get('/', getAllInterests);

export default router
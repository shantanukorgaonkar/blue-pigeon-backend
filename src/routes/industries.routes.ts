import express from "express";
import { getAllIndustries } from "../controllers/industry.controller";

const router = express.Router();
router.get('/', getAllIndustries);

export default router
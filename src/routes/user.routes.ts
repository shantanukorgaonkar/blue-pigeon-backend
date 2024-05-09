import express from "express";
import { getSelf, registerUser } from "../controllers/user.controller";
import { validateData } from "../middleware/data-validation";
import { userRegistrationSchema } from "../dto/schema";
const router = express.Router();

router.post('/', [validateData(userRegistrationSchema)], registerUser);
router.get('/me', getSelf);

export default router
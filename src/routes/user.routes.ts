import express from "express";
import { getSelf, loginUser, registerUser } from "../controllers/user.controller";
import { validateData } from "../middleware/data-validation";
import { userLoginSchema, userRegistrationSchema } from "../dto/schema";
import { verifyAuth } from "../middleware/auth";
const router = express.Router();

router.post('/register', [validateData(userRegistrationSchema)], registerUser);
router.post('/login', [validateData(userLoginSchema)], loginUser);
router.get('/me', [verifyAuth], getSelf);

export default router
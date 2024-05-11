import express from "express";
import { addFriend, getAllUsers, getFriends, getPosts, getSelf, loginUser, registerUser, updateUserProfile } from "../controllers/user.controller";
import { validateData } from "../middleware/data-validation";
import { updateUserProfileSchema, userLoginSchema, userRegistrationSchema } from "../dto/user/user.schema";
import { verifyAuth } from "../middleware/auth";
const router = express.Router();

router.post('/register', [validateData(userRegistrationSchema)], registerUser);
router.post('/login', [validateData(userLoginSchema)], loginUser);
router.post('/addFriend', [verifyAuth], addFriend);
router.get('/me', [verifyAuth], getSelf);
router.get('/posts', [verifyAuth], getPosts);
router.get('/friends', [verifyAuth], getFriends);
router.get('/', [verifyAuth], getAllUsers);
router.patch('/update', [verifyAuth, validateData(updateUserProfileSchema)], updateUserProfile)

export default router
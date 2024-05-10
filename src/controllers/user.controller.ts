import { Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';
import { addUser, findUserByEmail, findUserById, updateUser } from '../services/user.service';
import { generateJwtWebToken, hashPassword, sendError, sendSuccess, verifyPassword } from '../utils/utils';
import { RequestWithUser } from '../middleware/auth';
import { IUpdateUserProfileDto, IUserLoginDto, IUserRegistrationDto } from '../dto/user/user.dto';
import { findByUserId } from '../services/post.service';
import { createFriend, findFriendsByUser } from '../services/friend-list.service';
import { FriendListModel } from '../models/friend-list';
import { ObjectId } from 'mongodb';
import { IFriendRequestDto } from '../dto/friend-request/friend-request.dto';


export const registerUser = async (req: Request<{}, {}, IUserRegistrationDto>, res: Response) => {
    if (req.user) {
        return sendError(res, 400, "User Already Exists");
    }
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
        return sendError(res, 400, "Invalid Request")
    }
    try {
        const hashedPassword = await hashPassword(password);
        const user = new UserModel()
        user.email = email
        user.password = hashedPassword
        user.firstName = firstName
        user.lastName = lastName
        const createduser = await addUser(user);
        if (createduser) {
            const jwtToken = generateJwtWebToken(createduser.id);
            const response = { id: createduser.id, email: createduser.email, token: jwtToken }
            return sendSuccess(res, 201, "User is created", response)
        } else {
            return sendError(res, 400, "Invalid User Data")
        }
    } catch (error) {
        console.log(error);
        return sendError(res, 500, error.message)
    }
}

export const getSelf = async (req: RequestWithUser, res: Response) => {
    try {
        const userId = req.userId
        const user = await findUserById(userId)
        if (!user) {
            sendError(res, 404, "User not found")
        } else {
            return sendSuccess(res, 200, "User found", user)
        }

    } catch (error) {
        console.log(error);
        return sendError(res, 500, error.message)
    }
}
export const loginUser = async (req: Request<{}, {}, IUserLoginDto>, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return sendError(res, 400, "Invalid Request");
    }
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return sendError(res, 404, "User Does not exist");
        }
        const isPasswordValid = await verifyPassword(password, user.password);
        if (isPasswordValid) {
            const jwtToken = generateJwtWebToken(user.id);
            const response = { id: user.id, email: user.email, token: jwtToken }
            return sendSuccess(res, 200, "Logged In", response)
        } else {
            return sendError(res, 400, "Incorrect Password")
        }
    } catch (error) {
        console.log(error)
        return sendError(res, 500, error.message)
    }
}

export const updateUserProfile = async (req: RequestWithUser<IUpdateUserProfileDto>, res: Response) => {
    const { industries, interests, username, email, firstName, lastName } = req.body;
    const userId = req.userId
    try {
        const user = await findUserById(userId);
        if (!user) {
            return sendError(res, 404, "User Does not exist");
        } else {
            user.email = email
            user.firstName = firstName
            user.lastName = lastName
            user.industries = industries
            user.interests = interests
            user.username = username
            const updatedUser = await updateUser(userId, user)
            return sendSuccess(res, 200, "User Updated.", updatedUser)
        }
    } catch (error) {
        console.log(error)
        return sendError(res, 500, error.message)
    }
}

export const getPosts = async (req: RequestWithUser, res: Response) => {
    try {
        const posts = await findByUserId(req.userId)
        return sendSuccess(res, 200, "Posts found.", posts)
    } catch (error) {
        sendError(res, 500, error.message)
    }
}

export const addFriend = async (req: RequestWithUser<IFriendRequestDto>, res: Response) => {
    try {
        const friendRequest = new FriendListModel()
        friendRequest.sender = new ObjectId(req.userId)
        friendRequest.receiver = new ObjectId(req.body.receiverId)
        const newFriend = await createFriend(friendRequest)
        return sendSuccess(res, 200, "Posts found.", newFriend)
    } catch (error) {
        sendError(res, 500, error.message)
    }
}

export const getFriends = async (req: RequestWithUser, res: Response) => {
    try {

        const friendList = await findFriendsByUser(req.userId)
        const friends = friendList.map((friend) => {
            if (friend.sender._id.toString() === req.userId) {
                return friend.receiver
            } else if (friend.receiver._id.toString() === req.userId) {
                return friend.sender
            } else {
                throw new Error("User not found in the friend list.")
            }
        })
        return sendSuccess(res, 200, "Posts found.", friends)
    } catch (error) {
        sendError(res, 500, error.message)
    }
}
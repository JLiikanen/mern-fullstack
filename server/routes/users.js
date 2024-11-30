import Router from 'express'
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, getMe }  from '../controllers/userController.js'
import asyncHandler from 'express-async-handler';
import { protect } from '../middleware/authmiddleware.js';

// the core path of api/users is already defined. Here you just defined the rest. Like /login

const userRouter = Router()

userRouter.route("/").get(protect, asyncHandler(getUsers)).post(asyncHandler(createUser));

userRouter.route("/:id").put(protect, asyncHandler(updateUser)).delete(protect, asyncHandler(deleteUser));

userRouter.route("/login").post(asyncHandler(loginUser))

userRouter.route("/me").get(protect, asyncHandler(getMe))

export default userRouter 
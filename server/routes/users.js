import Router from 'express'
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser }  from '../controllers/userController.js'
import asyncHandler from 'express-async-handler';

// the core path of api/users is already defined. Here you just defined the rest. Like /login

const userRouter = Router()

userRouter.route("/").get(asyncHandler(getUsers)).post(asyncHandler(createUser));

userRouter.route("/:id").put(asyncHandler(updateUser)).delete(asyncHandler(deleteUser));

userRouter.route("/login").post(asyncHandler(loginUser))

export default userRouter
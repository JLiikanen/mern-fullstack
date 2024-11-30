import express from "express";
import { getGoals, postGoal, updateGoal, deleteGoal } from "../controllers/goalController.js";
import asyncHandler from "express-async-handler"
import { protect } from "../middleware/authmiddleware.js"

const goalsRouter = express.Router();

goalsRouter.route("/").get(protect, asyncHandler(getGoals)).post(protect, asyncHandler(postGoal));

goalsRouter.route("/:id").put(protect, asyncHandler(updateGoal)).delete(protect, asyncHandler(deleteGoal));

export default goalsRouter;

import express from "express";
import { getGoals, postGoal, updateGoal, deleteGoal } from "../controllers/goalController.js";
import asyncHandler from "express-async-handler"

const goalsRouter = express.Router();

goalsRouter.route("/").get(asyncHandler(getGoals)).post(asyncHandler(postGoal));

goalsRouter.route("/:id").put(asyncHandler(updateGoal)).delete(asyncHandler(deleteGoal));

export default goalsRouter;

import { goal } from "../db_schema/models.js";

/**
 * @desc Get all goals
 * @route api/goals
 * @method GET
 * @access private
 */

async function getGoals(req, res) {
    const goals = await goal.find()

    res.status(200).json(goals);
    
    
}

/**
 * @desc create a goal
 * @route api/goals
 * @method POST
 * @access private
 */
async function postGoal(req, res, next) {
    console.log(req.body); 
    if (("name" in req.body))  {
        const newGoal = await goal.create({
            name: req.body.name,
            deadline: "2024-12-31",
            isCompleted: false, // Default to incomplete
        });
        res.status(200).json({ message: `Created goal: ${newGoal}` });
    } else {
        // res.status(400).json({ message: "Goal name is required. Please add a name field." });
        next(new Error("Goal name is required. Please add a name field."));
    }
    
    
        
    }


/**
 * @desc update a goal
 * @route api/goals/:id 
 * @method PUT
 * @access private
 */
async function updateGoal(req, res) {
    const goalId = req.params.id;
    const updatedGoal = await goal.findByIdAndUpdate(
        goalId,
        req.body,
        { new: true }
    );

    if (!updatedGoal) {
        throw new Error('Goal not found');
    }
    else {
        res.status(200).json({ message: `Goal ${goalId} updated successfully!`, goal: updatedGoal });
    }
}

/**
 * @desc delete a goal
 * @route api/goals/:id
 * @method DELETE
 * @access private
 */
async function deleteGoal(req, res) {
    const goalId = req.params.id;
    const deletedGoal = await goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
        throw new Error('Goal not found');
    }
    
    res.status(200).json({ 
        message: `Goal ${goalId} deleted successfully`,
        goal: deletedGoal 
    });
}

export { getGoals, postGoal, updateGoal, deleteGoal };
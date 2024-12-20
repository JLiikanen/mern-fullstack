import { User } from "../db_schema/models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const saltRounds = 10;

// 
/**
 * @desc Create a new user
 * @route api/users
 * @method POST
 * @access private
 */

// todo: make sure only unique emails are registered!
// query for the user email first, and return an error if it is found!

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Ahoy! A user with this email already exists!' });
        }
        const newUser = new User({ name : name, email : email, password: hash, role : role.toLowerCase() }); // gives err if fields dont fit the validator

        const createdUser = await newUser.save(); // returns default fields

        res.status(201).json({
            message : `Successful creation of user! ${createdUser._id}`,
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            token: generateToken(createdUser._id)
        })
        console.log("logger: successfully created user!")
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
};

// READ: Get all users
/**
 * @desc Get all users
 * @route api/users
 * @method GET
 * @access private
 */

const getUsers = async (req, res) => {
    try {
        console.log(req.headers)
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ: Get a single user by ID
/**
 * @desc Get a single users
 * @route api/users/:id
 * @method GET
 * @access private
 */
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE: Update a user's details by ID
/**
 * @desc Updates user record by id
 * @route api/users/:id
 * @method PUT
 * @access private
 */
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE: Delete a user by ID
/**
 * @desc Deletes user by id
 * @route api/users/:id
 * @method DELETE
 * @access private
 */
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/*
 * @desc Authenticates user
 * @route api/users/login/
 * @method POST
 * @access private
*/
const loginUser = 
    async (req, res) => {
        const {email, password} = req.body
        console.log("auhtenticating", email, password)
        const user = await User.findOne({email : email})

        if (user && await bcrypt.compare(password, user.password))
            // 

            res.json({message : "Login successful!",
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : generateToken(user._id)
            }) // works!! 23.11.2024
        else {
            res.status(400).json({message : "Wrong passowrd. Try again."})
        }
}

/*
 * @desc Test route for auth. 
 * @route /api/users/me
 * @method  GET
 * @access private
*/
const getMe = async (req, res) => {
    console.log("getme")
    res.json({message:  "sup"})
      
}

const generateToken = (user_id) => {
    return jwt.sign({user_id}, process.env.JWT_SECRET_KEY, {expiresIn:'30d'})
}
// Export the controller functions
export { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, getMe };

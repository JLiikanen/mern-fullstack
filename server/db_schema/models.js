import mongoose from "mongoose"


const goalSchema = new mongoose.Schema(
    {name: String, 
    deadline: String, 
    postingDate : { type: Date, default: Date.now },
    isCompleted : Boolean, 
    user  : {required : true, type: mongoose.Schema.Types.ObjectId, ref : "User"}
}
)

const goal = new mongoose.model("Goal", goalSchema)


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'Architect'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);



// ... existing goal model code ...

export { User, goal };

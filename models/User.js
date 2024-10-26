import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }],
        dialogs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dialog',
        }]
    },
    { timestamps: true },
)

export default mongoose.model("User", UserSchema)
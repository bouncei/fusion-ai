import { ObjectId } from "bson";
import { Schema, model, models } from "mongoose";

const CodeSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
    },
    conversationId: {
        type: ObjectId,
        required: true,
        unique: true,
    },
    role: {
        type: String,
    },
    content: {
        type: String,
    },
})


const User = models?.User || model("User", CodeSchema)


export default User



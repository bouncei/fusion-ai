import { ObjectId } from "bson";
import { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema({
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


const Conversation = models?.Conversation || model("Conversation", ConversationSchema)


export default Conversation



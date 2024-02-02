import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }], // Change "User" to "Client"
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

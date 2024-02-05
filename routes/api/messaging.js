import express from "express";
import Message from "../../Models/messageModel.js";
import Conversation from "../../Models/conversationModel.js";
import { getIO, setupSocket } from "../../socket.js";
import auth from '../../middleware/auth.js'
const router = express.Router();

// Send Message
router.post("/api/messages", auth, async (req, res) => {
  try {
    // Extract required fields from request body
    const { senderId, receiverId, productId, content } = req.body;

    // Find or create a conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      productId,
      content,
    });

    // Add the message to the conversation
    conversation.messages.push(message._id);
    await conversation.save();

    // Emit the message to the receiver if online
    const io = setupSocket();
    const receiverSocket = io.sockets.sockets.get(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket.id).emit("receive_private_message", message);
    }

    // Respond with success message and message data
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Message
router.put("/api/messages/:messageId", auth, async (req, res) => {
  try {
    // Extract required fields from request body
    const { content } = req.body;
    const messageId = req.params.messageId;

    // Find and update the message
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true } // Return the updated message
    );

    // Emit event to notify clients about message update
    const io = setupSocket();
    io.emit("message_updated", { messageId });

    // Respond with updated message data
    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Message
router.delete("/api/messages/:messageId", auth, async (req, res) => {
  try {
    const messageId = req.params.messageId;

    // Remove message reference from associated conversation
    await Conversation.updateOne(
      { messages: messageId },
      { $pull: { messages: messageId } }
    );

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    // Emit event to notify clients about message deletion
    const io = setupSocket();
    io.emit("message_deleted", { messageId });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Conversation
router.get("/api/conversations/:senderId/:receiverId", auth, async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Find the conversation between sender and receiver
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: { path: "senderId" }, // Populate sender details
    });

    // Respond with conversation data
    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Conversation
router.delete("/api/conversations/:conversationId", auth, async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    // Find the conversation to be deleted
    const conversation = await Conversation.findById(conversationId);
    // Delete associated messages
    await Message.deleteMany({ _id: { $in: conversation.messages } });

    // Delete the conversation
    await Conversation.findByIdAndDelete(conversationId);

    // Emit event to notify clients about conversation deletion
    const io = setupSocket();
    io.emit("conversation_deleted", { conversationId });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

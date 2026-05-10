const Message = require("../models/message");
const Group = require("../models/group");
const axios = require("axios");

const sendMessageService = async ({ groupId, senderId, text }) => {

    if (!groupId || !senderId || !text) {
        throw new Error("groupId or text not available");
    }

    // Check group
    const group = await Group.findById(groupId);

    if (!group) {
        throw new Error("Group not present");
    }

    // Check membership
    const isMember = group.members.some(
        (member) => member.toString() === senderId.toString()
    );

    if (!isMember) {
        throw new Error("You are not a member of this group");
    }

    // Save user message
    const userMessage = await Message.create({
        groupId,
        senderId,
        role: "user",
        text,
    });

    let aiMessage = null;

    // AI Trigger
    if (text.toLowerCase().includes("@ai")) {

        // Fetch recent messages
        const recentMessages = await Message.find({ groupId })
            .sort({ createdAt: -1 })
            .limit(10);

        // Filter noise
        const filteredMessages = recentMessages
            .reverse()
            .filter((msg) => {

                const cleanText = msg.text.toLowerCase().trim();

                if (cleanText.length < 5) return false;

                const noiseWords = [
                    "ok",
                    "okay",
                    "hi",
                    "hello",
                    "yes",
                    "no",
                    "lol"
                ];

                if (noiseWords.includes(cleanText)) {
                    return false;
                }

                return true;

            });

        // Build context
        const context = filteredMessages
            .map((msg) => `${msg.role}: ${msg.text}`)
            .join("\n");

        // System Prompt
        const systemPrompt = `
ROLE:
You are an AI travel assistant inside a group chat.

INSTRUCTIONS:
- Help users plan trips
- Use previous messages as context
- Keep answers short and practical
- Sound conversational
`;

        const finalQuery = `
${systemPrompt}

CONVERSATION:
${context}

User: ${text}

AI:
`;

        // FastAPI call
        const response = await axios.post(
            "http://127.0.0.1:8000/chat",
            {
                query: finalQuery,
            }
        );

        const aiResponse = response.data.response;

        // Save AI Message
        aiMessage = await Message.create({
            groupId,
            senderId: null,
            role: "ai",
            text: aiResponse,
        });

    }

    return {
        userMessage,
        aiMessage,
    };

};

module.exports = {
    sendMessageService,
};
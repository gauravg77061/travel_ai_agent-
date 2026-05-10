const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {

    console.log("Connected:", socket.id);

    const groupId = "69f5bc634498891224ab36fb";

    socket.emit("join_group", groupId);

    socket.emit("send_message", {
        groupId,
        senderId: "69f5d009c38faa7fc47cbb8e",
        text: "@ai can u plan 2 days trip of New york",
    });

});

// Listen for all realtime messages
socket.on("receive_message", (message) => {

    console.log("\n========= NEW MESSAGE =========");
    console.log(message);

});
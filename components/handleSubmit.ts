import {Dispatch, SetStateAction} from "react";
import {io} from "socket.io-client";

const socket = io("https://chat-us-server.onrender.com/");

interface Message {
  text: string;
  isUserMessage: boolean;
}

const handleSubmit = (
  event: React.FormEvent,
  message: string,
  setMessage: Dispatch<SetStateAction<string>>
) => {
  event.preventDefault();

  if (message.trim() !== "") {
    // Emit the message to the server
    socket.emit("message", message);

    // Clear the input after submission
    setMessage("");
  }
};

export default handleSubmit;

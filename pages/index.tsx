import {useEffect, useState} from "react";
import handleInput from "../components/handleInput";
import handleKeyDown from "../components/handleKeyDown";
import handleSubmit from "../components/handleSubmit";
import {io} from "socket.io-client";
import React from "react";

const socket = io("https://chat-us-server.onrender.com/");

interface Message {
  text: string;
  isUserMessage: boolean;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (msg: string) => {
      setMessageList((prevMessages) => [
        ...prevMessages,
        {
          text: `users: ${msg}`,
          isUserMessage: false,
        },
      ]);
    });

    return () => {
      socket.off("message"); // Cleanup listener when component unmounts
    };
  }, []);

  return (
    <>
      <div className="min-h-screen p-4 text-base sm:p-6 sm:text-lg md:p-8 md:text-xl lg:p-10 lg:text-2xl xl:p-12 xl:text-3xl bg-gray-300 overflow-x-hidden">
        <div className="relative w-full h-full">
          <h6 className="relative left-20 no-underline">WELCOME TO CHAT US!</h6>
          <hr className="relative top-5 border-2 border-black" />
          <br />
          <div
            className="messages overflow-y-auto w-full"
            style={{
              maxHeight: "calc(70vh - 120px)",
            }}
          >
            {messageList.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isUserMessage ? "justify-end" : "justify-start"
                }`}
              >
                <p className="p-2">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed left-1/4 bottom-10 w-1/2">
          <form
            onSubmit={(e) => {
              handleSubmit(e, message, setMessage);
            }}
          >
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleInput(e);
              }}
              className="w-full p-2 border border-gray-400 rounded resize-none"
              placeholder="Type a message..."
              rows={1}
              style={{maxHeight: "100px"}}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </div>
    </>
  );
}

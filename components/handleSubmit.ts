const handleSubmit = (
  event: React.FormEvent,
  message: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  messageList: { text: string; isUserMessage: boolean }[],
  setMessageList: React.Dispatch<
    React.SetStateAction<{ text: string; isUserMessage: boolean }[]>
  >
) => {
  event.preventDefault();

  if (message.trim() !== "") {
    setMessageList((prevMessages) => [
      ...prevMessages,
      { text: `You: ${message}`, isUserMessage: true }, // User message
    ]);

    setTimeout(() => {
      setMessageList((prevMessages) => [
        ...prevMessages,
        { text: `other: `, isUserMessage: false }, // Other user's response
      ]);
    }, 1000);
  }
  setMessage("");
};

export default handleSubmit;

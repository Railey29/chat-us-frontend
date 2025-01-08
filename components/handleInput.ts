const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.preventDefault();
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
};

export default handleInput;

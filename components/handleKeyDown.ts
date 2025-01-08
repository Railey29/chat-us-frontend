const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key == "Enter" && !event.shiftKey) {
    event.preventDefault();
    const target = event.target as HTMLTextAreaElement | null;

    if (target && target.form) {
      target.form.requestSubmit();
    }
  }
};

export default handleKeyDown;

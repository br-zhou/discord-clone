import { useRef } from "react";
import classes from "./ChatBox.module.css";

const ChatBox = (props) => {
  const inputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const message = inputRef.current.value;
    
    if (message.trim() === "") return;
    
    props.sendMessage(message);
    inputRef.current.value = "";
  };

  return (
    <div className={classes.container}>
      <form onSubmit={onSubmitHandler}>
        <input
          className={classes.input}
          placeholder="send message in chat"
          ref={inputRef}
        ></input>
      </form>
    </div>
  );
};

export default ChatBox;

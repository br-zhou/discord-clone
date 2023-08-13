import classes from "./ChatBox.module.css";

const ChatBox = (props) => {
  return (
    <div className={classes.container}>
      <input className={classes.input} placeholder="send message in chat"></input>
    </div>
  );
};

export default ChatBox;

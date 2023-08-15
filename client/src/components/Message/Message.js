import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={classes.container}>
      <img
        className={classes.profile}
        src="https://cdn.discordapp.com/attachments/803481006446870598/1133930696562454569/export-i.gif"
        alt=""
      />
      <div>
        <h4 className={classes.name}>{props.username || "Guest"}</h4>
        <p className={classes.msg}>{props.msg}</p>
      </div>
    </div>
  );
};

export default Message;

import classes from "./Message.module.css";

const Message = (props) => {
  if (props.server) {
    return (
      <div className={classes.container}>
        <p className={classes.msg}>{props.msg}</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h4 className={classes.name}>{props.username}</h4>
      <p className={classes.msg}>{props.msg}</p>
    </div>
  );
};

export default Message;

import classes from "./Member.module.css";

const Member = (props) => {
  return (
    <div className={classes.container}>
      <img
        className={classes.profile}
        src="https://cdn.discordapp.com/attachments/803481006446870598/1133930696562454569/export-i.gif"
        alt=""
      />
      <h4 className={classes.name}>{props.name || "Guest"}</h4>
    </div>
  );
};

export default Member;

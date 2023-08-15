import classes from "./RoomIcon.module.css";

const RoomIcon = (props) => {
  return (
    <div className={classes.icon}>
      {props.img && <img src={props.img} alt="" />}
    </div>
  );
};

export default RoomIcon;

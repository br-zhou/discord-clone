import { Link } from "react-router-dom";
import classes from "./RoomIcon.module.css";

const RoomIcon = (props) => {
  return (
    <Link to={`/room/${props.link}`}>
      <div className={classes.icon}>
        {props.img && <img src={props.img} alt="" />}
      </div>
    </Link>
  );
};

export default RoomIcon;

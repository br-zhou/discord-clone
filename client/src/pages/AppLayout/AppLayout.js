import { Outlet } from "react-router-dom";
import classes from "./AppLayout.module.css";
import RoomIcon from "../../components/RoomIcon/RoomIcon";

const AppLayout = () => {
  return (
    <div className={classes.page_container}>
      <div className={classes.sidebar}>
        <RoomIcon link={"General"} />
        <RoomIcon link={"Secret Room"} />
      </div>

      <Outlet />
    </div>
  );
};

export default AppLayout;

import RoomIcon from "../../components/RoomIcon/RoomIcon";
import classes from "./AppPage.module.css";

const AppPage = () => {
  return (
    <div className={classes.page_container}>
      <div className={classes.sidebar}>
        <RoomIcon />
        <RoomIcon />
        <RoomIcon />
        <RoomIcon />
      </div>
      <div className={classes.chat}> Chat Section</div>
      <div className={classes.users}> Users</div>
    </div>
  );
};

export default AppPage;

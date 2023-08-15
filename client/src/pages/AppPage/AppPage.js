import RoomIcon from "../../components/RoomIcon/RoomIcon";
import classes from "./AppPage.module.css";
import RoomContent from "../../components/RoomContent/RoomContent";

const AppPage = () => {

  return (
    <div className={classes.page_container}>
      <div className={classes.sidebar}>
        <RoomIcon />
        <RoomIcon />
        <RoomIcon />
        <RoomIcon />
      </div>

      <RoomContent />
    </div>
  );
};

export default AppPage;

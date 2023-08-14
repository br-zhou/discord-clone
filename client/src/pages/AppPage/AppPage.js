import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RoomIcon from "../../components/RoomIcon/RoomIcon";
import { useStocket } from "../../hooks/useSocket";
import { useStore } from "../../hooks/useStore";
import classes from "./AppPage.module.css";
import RoomContent from "../../components/RoomContent/RoomContent";

const AppPage = () => {
  const params = useParams();
  const [store, setStore] = useStore();
  const socket = useStocket();


  useEffect(() => {
    if (!store.room) {
      const room = params.roomId;
      setStore("username", "Guest");
      setStore("room", room);
      socket.emit("join-room", room);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {});

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

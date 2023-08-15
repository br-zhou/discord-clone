import ChatBox from "../ChatBox/ChatBox";
import Member from "../Member/Member";
import Message from "../Message/Message";
import { useParams } from "react-router-dom";
import { useStocket } from "../../hooks/useSocket";
import { useStore } from "../../hooks/useStore";
import classes from "./RoomContent.module.css";
import { useEffect, useState } from "react";

const RoomContent = () => {
  const params = useParams();
  const room = params.roomId;
  const [store, setStore] = useStore();
  const socket = useStocket();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const sendMessageHandler = async (message) => {
    const data = {
      message,
      room: room,
      username: store.username,
    };

    await socket.emit("send-message", data);
    console.log("sent!");
  };

  const newMsgHandler = (data) => {
    setMessages((msgs) => [...msgs, data]);
  };

  const newUserHandler = (data) => {
    console.log("new user!!");
    setMessages((msgs) => [
      ...msgs,
      { server: true, msg: `${data.username} joined the server!` }, // todo generate unique key
    ]);

    setUsers((users) => [...users, data]);
  };

  const userLeaveHandler = (id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  };

  const onMount = () => {
    socket.on("new-message", newMsgHandler);
    socket.on("new-user", newUserHandler);
    socket.on("user-leave", userLeaveHandler);

    if (!store.room) {
      setStore("username", "Guest");
      setStore("room", room);
    }

    socket.emit(
      "join-room",
      { room, username: store.username || "Guest" },
      (response) => {
        setUsers(response);
      }
    );

    return onUnmountHandler;
  };

  const onUnmountHandler = () => {
    socket.emit("leave-room", store.room);
    socket.removeListener("new-message", newMsgHandler);
    socket.removeListener("new-user", newUserHandler);
    socket.removeListener("user-leave", userLeaveHandler);
  };

  useEffect(
    onMount,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const messagesGenerator = (messages) => {
    return messages.map((msgData) => <Message {...msgData} />);
  };

  const usersGenerator = (users) => {
    console.log(users);
    return users.map(({ id, username }) => <Member name={username} key={id} />);
  };

  return (
    <>
      <div className={classes.main_container}>
        <div className={classes.server_title}>
          <h3>{store.room}</h3>
        </div>

        <div className={classes.chat_container}>
          {messagesGenerator(messages)}
        </div>
        <div>
          <ChatBox sendMessage={sendMessageHandler} />
        </div>
      </div>

      <div className={classes.users}>
        <h3>Online:</h3>
        {usersGenerator(users)}
      </div>
    </>
  );
};

export default RoomContent;

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
    console.log(data);
    setMessages((msgs) => [...msgs, data]);
    console.log(messages);
  };

  const newUserHandler = (id) => {
    setUsers((users) => [...users, id]);
  };

  const onMount = () => {
    socket.on("new-message", newMsgHandler);
    socket.on("new-user", newUserHandler);

    if (!store.room) {
      setStore("username", "Guest");
      setStore("room", room);
    }

    socket.emit("join-room", room, (response) => {
      const users = response.users;
      setUsers(users);
    });
  };

  const onUnmountHandler = () => {
    console.log("bye!");
    socket.removeListener("new-message", newMsgHandler);
  };

  useEffect(onMount, []);
  useEffect(() => onUnmountHandler, []);

  const messagesGenerator = (messages) => {
    return messages.map((msgData) => <Message {...msgData} />);
  };

  const usersGenerator = (users) => {
    return users.map((id) => <Member name={id} key={id} />);
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
        <h3>Members:</h3>
        {usersGenerator(users)}
      </div>
    </>
  );
};

export default RoomContent;

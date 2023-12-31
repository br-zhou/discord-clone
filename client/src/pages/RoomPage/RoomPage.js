import ChatBox from "../../components/ChatBox/ChatBox";
import Message from "../../components/Message/Message";
import { useParams } from "react-router-dom";
import { useStocket } from "../../hooks/useSocket";
import { useStore } from "../../hooks/useStore";
import classes from "./RoomPage.module.css";
import { useEffect, useRef, useState } from "react";
import UsersList from "../../components/UsersList/UsersList";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const RoomPage = () => {
  const params = useParams();
  const room = params.roomId;
  const chatBottomRef = useRef();
  const [store, setStore] = useStore();
  const socket = useStocket();
  const token = store.token;

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const sendMessageHandler = async (message) => {
    const data = {
      message,
      room: room,
      token,
    };

    await socket.emit("send-message", data);
    console.log("sent!");
  };

  const newMsgHandler = (data) => {
    setMessages((msgs) => [...msgs, data]);
  };

  const newUserHandler = (data) => {
    setUsers((users) => [...users, data]);
  };

  const userLeaveHandler = (id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  };

  const onMount = () => {
    socket.on("new-message", newMsgHandler);
    socket.on("new-user", newUserHandler);
    socket.on("user-leave", userLeaveHandler);

    if (!store.username) {
      setStore("username", "Guest");
    }

    return onUnmountHandler;
  };

  const onUnmountHandler = () => {
    socket.emit("leave-room", room);
    socket.removeListener("new-message", newMsgHandler);
    socket.removeListener("new-user", newUserHandler);
    socket.removeListener("user-leave", userLeaveHandler);
  };

  useEffect(
    onMount,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    chatBottomRef.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const prevRoom = store.room;

    if (prevRoom !== room) {
      setMessages([]);
      setUsers([]);
      socket.emit("leave-room", prevRoom);
    }

    socket.emit("join-room", { room, token }, (response) => {
      setUsers(response.users);
      setMessages(response.messages);
    });

    setStore("room", room);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.roomId]);

  const messagesGenerator = (messages) => {
    return messages.map((msgData) => <Message {...msgData} />);
  };

  return (
    <div className={classes.page_container}>
      <div className={classes.main_container}>
        <div className={classes.server_title}>
          <h3>{store.room}</h3>
        </div>

        <div className={classes.chat_container}>
          <div className={classes.msgs_wrapper}>
            {messagesGenerator(messages)}
            <span ref={chatBottomRef}></span>
          </div>
        </div>
        <div>
          <ChatBox sendMessage={sendMessageHandler} />
        </div>
      </div>

      <div className={classes.right_section_container}>
        <UsersList data={users} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default RoomPage;

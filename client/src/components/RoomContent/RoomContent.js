import ChatBox from "../ChatBox/ChatBox";
import Member from "../Member/Member";
import Message from "../Message/Message";
import { useParams } from "react-router-dom";
import { useStocket } from "../../hooks/useSocket";
import { useStore } from "../../hooks/useStore";
import classes from "./RoomContent.module.css";

const RoomContent = () => {
  const params = useParams();
  const [store, setStore] = useStore();
  const socket = useStocket();

  const sendMessageHandler = async (message) => {
    const data = {
      message,
      room: store.room,
    };

    await socket.emit("send-message", data);
    console.log("sent!");
  };

  return (
    <>
      <div className={classes.main_container}>
        <div className={classes.server_title}>
          <h3>{store.room}</h3>
        </div>

        <div className={classes.chat_container}>
          <Message msg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque dui, efficitur sit amet est quis, cursus malesuada justo. Aliquam mauris velit, scelerisque vel nulla quis, ornare congue leo. Donec placerat congue mollis. Vestibulum quam eros, porta in maximus et, vulputate rutrum elit. Donec laoreet ipsum vel maximus semper. Cras sollicitudin in justo at placerat. Suspendisse blandit posuere mauris. In id aliquet ante. Proin ac tincidunt odio. Nulla molestie, quam vitae maximus tristique, nisi tellus faucibus dui, nec aliquet orci orci at massa. Pellentesque ultricies mauris tempor tellus tristique volutpat. Vivamus pharetra libero vel tincidunt imperdiet. Praesent pellentesque sed neque et dictum. Integer augue leo, tempor eget consequat ac, ornare eu risus." />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
          <Message msg="Lorem ipsum dolo" />
        </div>
        <div>
          <ChatBox sendMessage={sendMessageHandler} />
        </div>
      </div>

      <div className={classes.users}>
        <h3>Members:</h3>
        <Member name="Test" />
        <Member />
        <Member />
        <Member />
        <Member />
        <Member />
      </div>
    </>
  );
};

export default RoomContent;

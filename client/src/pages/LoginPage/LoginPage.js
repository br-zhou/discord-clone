import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useStocket } from "../../hooks/useSocket";
import { useStore } from "../../hooks/useStore";

const LoginPage = () => {
  const socket = useStocket();
  const [, setStore] = useStore();
  const navigate = useNavigate();

  const loginSuccessHandler = ({ username, room }) => {
    socket.emit("join-room", room);
    setStore("username", username);
    setStore("room", room);
    navigate("/app");
  };

  return <LoginForm onSuccess={loginSuccessHandler} />;
};

export default LoginPage;

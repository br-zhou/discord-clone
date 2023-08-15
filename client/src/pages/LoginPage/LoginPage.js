import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useStocket } from "../../hooks/useSocket";
import { useStore } from "../../hooks/useStore";

const LoginPage = () => {
  const socket = useStocket();
  const setStore = useStore()[1];
  const navigate = useNavigate();

  const loginSuccessHandler = ({ username, room }) => {
    setStore("username", username);
    navigate(`/room/${room}`);
  };

  return <LoginForm onSuccess={loginSuccessHandler} />;
};

export default LoginPage;

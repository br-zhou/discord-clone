import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useStore } from "../../hooks/useStore";

const LoginPage = () => {
  const setStore = useStore()[1];
  const navigate = useNavigate();

  const formSubmitHandler = async ({ username, password, path }) => {
    const bodyJson = { username, password };
    try {
      const response = await fetch(`http://localhost:7999/api/${path}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bodyJson),
      });
      const data = await response.json();
      console.log(data);

      // setStore("username", username);
      // navigate(`/room/`);
    } catch (error) {
      console.log("an error occured");
      // todo implement feedback
    }
  };

  return <LoginForm onSubmit={formSubmitHandler} />;
};

export default LoginPage;

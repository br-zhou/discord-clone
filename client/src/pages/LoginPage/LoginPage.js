import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useStore } from "../../hooks/useStore";
import { useEffect } from "react";

const APP_PAGE = "/room/General";

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

      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        setStore("token", token);
        navigate(APP_PAGE);
      }
    } catch (error) {
      console.log("an error occured");
      // todo implement feedback
    }
  };

  return <LoginForm onSubmit={formSubmitHandler} />;
};

export default LoginPage;

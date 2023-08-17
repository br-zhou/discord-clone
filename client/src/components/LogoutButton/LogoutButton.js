import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks/useStore";
import classes from "./LogoutButton.module.css";

const LogoutButton = (props) => {
  const [, setStore] = useStore();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setStore("token", null);
    localStorage.setItem("token", null);
    navigate("/");
  };

  return (
    <button className={classes.btn} onClick={logoutHandler}>
      <span className={classes.text}>Logout</span>
    </button>
  );
};

export default LogoutButton;

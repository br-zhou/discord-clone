import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { createRef, useState } from "react";

const LoginForm = (props) => {
  const [mode, setMode] = useState("log in");

  const usernameRef = createRef();
  const roomRef = createRef();

  const toggleModeHandler = () => {
    setMode((mode) => (mode === "log in" ? "register" : "log in"));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.onSuccess({
      username: usernameRef.current.value || "Guest",
      room: roomRef.current.value || "General",
    });
  };

  return (
    <div className={classes.login_page}>
      <div className={classes.form}>
        <form className={classes.register_form} onSubmit={onFormSubmit}>
          <input type="text" placeholder="username" ref={usernameRef} />
          <input type="text" placeholder="room" ref={roomRef} />
          {/* <input type="password" placeholder="password" /> */}
          <button>{mode}</button>
          <p className={classes.message}>
            New?{" "}
            <Link onClick={toggleModeHandler}>
              {mode === "log in" ? "register" : "log in"}
            </Link>{" "}
            or join as a <Link>Guest</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

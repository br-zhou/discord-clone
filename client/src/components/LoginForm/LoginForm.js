import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { createRef, useState } from "react";

const STATE = {
  LOGIN: "log in",
  SIGNUP: "sign up",
};

const LoginForm = (props) => {
  const [mode, setMode] = useState(STATE.LOGIN);

  const usernameRef = createRef();
  const roomRef = createRef();

  const toggleModeHandler = () => {
    setMode((mode) => (mode === STATE.LOGIN ? STATE.SIGNUP : STATE.LOGIN));
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
        <h1 className={classes.title}>{mode}</h1>
        <form className={classes.register_form} onSubmit={onFormSubmit}>
          <input type="text" placeholder="username" ref={usernameRef} />
          <input type="text" placeholder="room" ref={roomRef} />
          {/* <input type="password" placeholder="password" /> */}
          <button>{mode}</button>
          <p className={classes.message}>
            New?{" "}
            <Link onClick={toggleModeHandler}>
              {mode === STATE.LOGIN ? STATE.SIGNUP : STATE.LOGIN }
            </Link>{" "}
            or join as a <Link to="/room/General">Guest</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

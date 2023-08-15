import { Link } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { createRef, useState } from "react";

export const STATE = Object.freeze({
  LOGIN: "log in",
  SIGNUP: "sign up",
});

const modeToPath = (mode) => {
  if (mode === STATE.SIGNUP) return "new-user";
  else return "user-login";
};

const LoginForm = (props) => {
  const [mode, setMode] = useState(STATE.LOGIN);

  const usernameRef = createRef();
  const passwordRef = createRef();

  const toggleModeHandler = () => {
    setMode((mode) => (mode === STATE.LOGIN ? STATE.SIGNUP : STATE.LOGIN));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      path: modeToPath(mode),
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className={classes.login_page}>
      <div className={classes.form}>
        <h1 className={classes.title}>{mode}</h1>
        <form className={classes.register_form} onSubmit={onFormSubmit}>
          <input type="text" placeholder="username" ref={usernameRef} />
          <input type="password" placeholder="password" ref={passwordRef} />
          <button>{mode}</button>
          <p className={classes.message}>
            New?{" "}
            <span onClick={toggleModeHandler}>
              {mode === STATE.LOGIN ? STATE.SIGNUP : STATE.LOGIN}
            </span>{" "}
            or join as a <Link to="/room/General">Guest</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

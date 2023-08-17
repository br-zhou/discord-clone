import Member from "../Member/Member";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  const users = props.data;

  const usersGenerator = (users) => {
    return users.map(({ id, username }) => <Member name={username} key={id} />);
  };

  return (
    <div className={classes.users}>
      <h3>Online: {users.length}</h3>
      {usersGenerator(users)}
    </div>
  );
};

export default UsersList;

import Member from "../Member/Member";
import classes from "./UsersList.module.css";

const UsersList = (props) => {
  const users = props.data;

  const usersGenerator = (users) => {
    try {
      return users.map(({ id, username }) => (
        <Member name={username} key={id} />
      ));
    } catch (err) {
      return null;
    }
  };

  return (
    <div className={classes.users}>
      <h3>Online: {users.length}</h3>
      {usersGenerator(users)}
    </div>
  );
};

export default UsersList;

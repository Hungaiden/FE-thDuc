import React, { useEffect } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import "./styles.css";
import { userListModel } from "../../modelData/model";
import { Link } from "react-router-dom";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  // const users = models.userListModel();
  const [users, setUsers] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userListModel();
        setUsers(res);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div style={{ width: "300px" }}>
      {/* <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography> */}
      <List component="nav">
        {users &&
          users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem button component={Link} to={`/users/${user._id}`}>
                <ListItemText primary={user.last_name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
      </List>
      {/* <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography> */}
      {/* <div>
          <table>
            <tr>
              <th>first_name</th>
              <th>last_name</th>
              <th>location</th>
              <th>description</th>
              <th>occupation</th>
            </tr>
            {userInfo && (
              <tr>
                <td>{userInfo.first_name}</td>
                <td>{userInfo.last_name}</td>
                <td>{userInfo.location}</td>
                <td>{userInfo.description}</td>
                <td>{userInfo.occupation}</td>
              </tr>
            )} 
          </table>
        </div> */}
    </div>
  );
}

export default UserList;

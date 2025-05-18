import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import "./styles.css";
import { userModel } from "../../modelData/model";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const userName = "Bui Duc Hung";
  const pathname = useLocation().pathname;
  const user = pathname.slice(pathname.lastIndexOf("/") + 1);
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userModel(user.userId);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(data);
  }, []);
  let currentContext = "data";
  if (!data) {
    currentContext = "no data";
  }
  console.log("Pathname: >>>", pathname);
  currentContext =
    pathname === "/"
      ? "home"
      : pathname === "/users"
      ? "List of users"
      : pathname.startsWith("/users/")
      ? data && `Details of ${data.last_name}`
      : pathname.startsWith("/photos/")
      ? data && `Photos of ${data.last_name}`
      : "error";
  console.log("current context: >>>", currentContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {userName}
          </Link>
          {" | "}
          <Link to="/users" style={{ textDecoration: "none", color: "black" }}>
            Users
          </Link>
        </Typography>
        <Typography variant="h6" component="div">
          {currentContext}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

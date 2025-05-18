import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { userModel } from "../../modelData/model";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const user = useParams();
  // const data = models.userModel(user.userId);
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
  }, []);

  if (!data) {
    return <Typography variant="body1">User not found</Typography>;
  }
  return (
    <div style={{ width: "400px" }}>
      {/* <Typography variant="body1">
            This should be the UserDetail view of the PhotoShare app. Since it is
            invoked from React Router the params from the route will be in property match.
            So this should show details of user: <strong><span style={{color: "red"}}>{data.first_name} </span></strong>
            You can fetch the model for the user from models.userModel.
          </Typography> */}

      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {data.first_name} {data.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {data.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Occupation: {data.occupation}
          </Typography>
          <Typography variant="body2">
            Description: {data.description}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={`/photos/${data._id}`}
          >
            View Photos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetail;

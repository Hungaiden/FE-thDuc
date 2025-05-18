import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";

import {
  userModel,
  photoOfUserModel,
  userListModel,
} from "../../modelData/model";

/**
 * Define UserPhotos, a React component of Project 4.
 */

function UserPhotos() {
  const user = useParams();
  // const data = models.userModel(user.userId);
  // const photos = models.photoOfUserModel(user.userId);
  const [data, setData] = useState();
  const [photos, setPhotos] = useState();
  const [listUser, setListUser] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const res1 = await userModel(user.userId);
        const res2 = await photoOfUserModel(user.userId);
        const res3 = await userListModel();
        setData(res1);
        setPhotos(res2);
        setListUser(res3);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.log("data: ", data);
  console.log("photo: ", photos);
  if (!data) {
    return <Typography variant="body1">User not found</Typography>;
  }
  if (!photos || photos.length === 0) {
    return <Typography>{data.last_name} donn't have a photo</Typography>;
  }
  return (
    <div>
      <Card>
        <CardContent>
          <Typography>
            Photo of{" "}
            <Link
              to={`/users/${data._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {data.last_name}
            </Link>
          </Typography>
          <Typography variant="body1">
            {photos.map((photo) => (
              <div key={photo._id} style={{ width: "400px" }}>
                <div>
                  <img
                    src={`../../images/${photo.file_name}`}
                    alt=""
                    width="400"
                  />
                  <p>Post at: {photo.date_time}</p>
                </div>
                <hr />
                <div>
                  {photo.comments && photo.comments.length > 0 ? (
                    <div>
                      <p>Comments:</p>
                      {photo.comments.map((item) => (
                        <Card>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              gutterBottom
                            >
                              <Link
                                to={`/users/${item.user_id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {
                                  listUser.find((e) => e._id === item.user_id)
                                    ?.last_name
                                }
                              </Link>
                            </Typography>
                            <Typography variant="body1">
                              Comment: {item.comment}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              Post at: {item.date_time}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div>No comment</div>
                  )}
                </div>
                <hr />
              </div>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserPhotos;

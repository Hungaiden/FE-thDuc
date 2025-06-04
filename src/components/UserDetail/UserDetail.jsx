import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { userModel } from "../../modelData/model";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const token = localStorage.getItem("accessToken");
  
  // const data = models.userModel(user.userId);
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // console.log(response.json());
        const data = await response.json();
        // console.log("data:", data); 
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [userId]);

  if (!data) {
    return <div className="error-message">User not found</div>;
  }
  return (
    <div className="user-detail-container">
      <div className="user-card">
        <div className="user-card-content">
          <h2 className="user-name">
            {data.first_name} {data.last_name}
          </h2>
          <p className="user-info">Location: {data.location}</p>
          <p className="user-info">Occupation: {data.occupation}</p>
          <p className="user-description">Description: {data.description}</p>
          <Link to={`/photos/${data._id}`} className="view-photos-btn">
            View Photos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;

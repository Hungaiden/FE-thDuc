import React, { useEffect } from "react";
import { useState } from "react";
import "./styles.css";
import { userListModel } from "../../modelData/model";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]); // Initialize as empty array
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("API Response:", data);

        // Kiểm tra data có phải array không
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.data && Array.isArray(data.data)) {
          // Nếu data được wrap trong object
          setUsers(data.data);
        } else {
          console.error("Data is not an array:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUsers([]);
      }
    };
    getData();
  }, []);
  return (
    <div className="user-list-container">
      <nav className="user-nav">
        {users &&
          users.map((user) => (
            <div key={user._id} className="user-item">
              <Link to={`/users/${user._id}`} className="user-link">
                {user.last_name}
              </Link>
              <hr className="user-divider" />
            </div>
          ))}
      </nav>
    </div>
  );
}

export default UserList;

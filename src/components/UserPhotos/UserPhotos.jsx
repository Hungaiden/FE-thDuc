import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams, Link } from "react-router-dom";

function UserPhotos() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [newComments, setNewComments] = useState({}); 
  
  const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/photos/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setPhotos(result.photos);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  useEffect(() => {
    getData();
  }, [userId]);

  const handleInputChange = (photoId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [photoId]: value,
    }));
  };

  const handleSubmitComment = async (photoId) => {
  const commentText = newComments[photoId];
  if (!commentText) return;

  try {
    const token = localStorage.getItem("accessToken"); // Sửa key token
    const response = await fetch(`http://localhost:8080/api/photos/commentsOfPhoto/${photoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: commentText }),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    // Sau khi comment thành công, gọi lại API để lấy data mới
    getData();
    
    // Clear input
    setNewComments((prev) => ({ ...prev, [photoId]: "" }));

  } catch (error) {
    console.error("Comment submission error:", error);
  }
};
  if (!data) {
    return <div className="error-message">Loading or user not found...</div>;
  }

  return (
    <div className="photos-container">
      <div className="photo-card">
        <div className="photo-header">
          Photos of{" "}
          <Link to={`/users/${data.user_id}`} className="user-link">
            {data.last_name}
          </Link>
        </div>

        {photos.length === 0 ? (
          <div className="no-photos">{data.last_name} doesn't have any photos</div>
        ) : (
          <div className="photo-content">
            {photos.map((photo) => (
              <div key={photo._id} className="photo-item">
                <div className="photo-image-container">
                  <img
                    src={photo.file_name}
                    alt="User upload"
                    className="photo-image"
                  />
                  <p className="photo-date">Posted at: {new Date(photo.date_time).toLocaleString()}</p>
                </div>
                <hr className="photo-divider" />

                <div className="comments-section">
                  {photo.comments && photo.comments.length > 0 ? (
                    <div className="comments-container">
                      <p className="comments-header">Comments:</p>
                      {photo.comments.map((comment) => (
                        <div key={comment._id} className="comment-card">
                          <Link
                            to={`/users/${comment.user_id._id}`}
                            className="comment-user-link"
                          >
                            {comment.user_id.last_name}
                          </Link>
                          <p className="comment-text">Comment: {comment.comment}</p>
                          <p className="comment-date">
                            Posted at: {new Date(comment.date_time).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-comments">No comments</div>
                  )}
                  {/* Giao diện nhập bình luận mới */}
                  <div className="comment-input-section">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComments[photo._id] || ""}
                      onChange={(e) => handleInputChange(photo._id, e.target.value)}
                      className="comment-input"
                    />
                    <button
                      onClick={() => handleSubmitComment(photo._id)}
                      className="submit-comment-button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <hr className="photo-divider" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPhotos;

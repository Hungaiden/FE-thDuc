import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './styles.css';

function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8080/api/photos/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });

      if (response.ok) {
        navigate(`/photos/${user.userId}`);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload New Photo</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="file-label">
            Choose Photo
          </label>
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>
    </div>
  );
}

export default UploadPhoto;
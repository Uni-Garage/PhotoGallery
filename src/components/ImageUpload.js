// src/components/ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      console.log('Uploading...', selectedFile);
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
      onUpload(response.data); // Assuming the server returns information about the uploaded image
      setSelectedFile(null); // Clear the selected file after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUpload;

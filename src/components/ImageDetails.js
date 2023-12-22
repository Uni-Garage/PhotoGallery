// src/components/ImageDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageDetails = ({ imageId }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/images/${imageId}`);
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image details:', error);
      }
    };

    fetchImageDetails();
  }, [imageId]);

  return (
    <div>
      {image ? (
        <div>
          <h2>{image.name}</h2>
          <img src={`http://localhost:5000/images/${image.name}`} alt={image.name} />
          <p>{image.details}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageDetails;

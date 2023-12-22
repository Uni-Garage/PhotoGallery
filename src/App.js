// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './components/Pagination';
import './App.css'; // Import the CSS file

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const handleCloseModal = (e) => {
    // Close modal only if clicked outside the image
    if (e.target.classList.contains('modal-overlay')) {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <h1>Photo Gallery</h1>
      {selectedImage ? (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal">
            <img
              src={`http://localhost:5000/images/${selectedImage.name}`}
              alt={selectedImage.name}
            />
          </div>
        </div>
      ) : null}
      <div>
        <div className="gallery-container">
          {currentImages.map((image) => (
            <div
              className="gallery-item"
              key={image.id}
              onClick={() => handleImageClick(image)}
            >
              <img src={`http://localhost:5000/images/${image.name}`} alt={image.name} />
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(images.length / imagesPerPage)}
          onPageChange={paginate}
          pagesToShow={5}
        />
      </div>
        <div>
        </div>
    </div>
  );
};



export default App;

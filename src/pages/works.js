import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import '../styles/works.css';

const Works = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://kaitoportfolio.microcms.io/api/v1/photolibrary', {
          headers: {
            'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ'
          }
        });
        setImages(response.data.contents);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2
  };


  return (
    <div className="works-container">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.photo.url} alt={image.title} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Works;

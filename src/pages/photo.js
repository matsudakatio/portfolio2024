import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import '../styles/photo.css';

const Photo = () => {
  const [images, setImages] = useState([]);
  const [groupedImages, setGroupedImages] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);

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

  useEffect(() => {
    if (images.length > 0) {
      const grouped = images.reduce((acc, image) => {
        image.genre.forEach(genre => {
          if (!acc[genre]) {
            acc[genre] = [];
          }
          acc[genre].push(image);
        });
        return acc;
      }, {});
      setGroupedImages(grouped);
    }
  }, [images]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const handleResetClick = () => {
    setSelectedGenre(null);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2
  };

  return (
    <div className="photoContainer">
      <div className="genreButtons">
      <p>PHOTOGRAPH</p>

        <div className="right">
            {Object.keys(groupedImages).map((genre, index) => (
            <button key={index} onClick={() => handleGenreClick(genre)}>
                {genre}
            </button>
            ))}
            <button onClick={handleResetClick}>All</button>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {selectedGenre
          ? groupedImages[selectedGenre].map((image, imgIndex) => (
              <div key={imgIndex} className="gallery-item">
                <img src={image.photo.url} alt={`Photo ${imgIndex + 1}`} />
              </div>
            ))
          : images.map((image, imgIndex) => (
              <div key={imgIndex} className="gallery-item">
                <img src={image.photo.url} alt={`Photo ${imgIndex + 1}`} />
              </div>
            ))}
      </Masonry>
    </div>
  );
};

export default Photo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loadedImages, setLoadedImages] = useState({}); // 追加: 各画像の読み込み状態を追跡

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://kaitoportfolio.microcms.io/api/v1/movie', {
          headers: {
            'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ'
          }
        });
        setMovies(response.data.contents);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true })); // 画像が読み込まれたら状態を更新
  };

  return (
    <div>
      <div className="movieArea">
        {movies.map((movie, index) => (
          <a href={movie.url} key={index} target="_blank" rel="noopener noreferrer">
            <div className="movieItem">
              <h2>>>{movie.title}</h2>
              <div className="imageGallery">
                {movie.image.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img.url}
                    alt={`Image ${imgIndex + 1}`}
                    style={{ opacity: loadedImages[imgIndex] ? 1 : 0 }} // 画像の読み込み状態に応じて表示
                    onLoad={() => handleImageLoad(imgIndex)} // 画像が読み込まれたときに呼び出し
                  />
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Movie;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <div className="movieArea">
        {movies.map((movie, index) => (

            <a href={movie.url} target="_blank" rel="noopener noreferrer">
                <div key={index} className="movieItem">
                    <h2>>>{movie.title}</h2>
                    <div className="imageGallery">
                        {movie.image.map((img, imgIndex) => (
                            <img key={imgIndex} src={img.url} alt={`Image ${imgIndex + 1}`} />
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

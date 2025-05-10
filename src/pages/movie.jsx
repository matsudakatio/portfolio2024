import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loadedImages, setLoadedImages] = useState({}); // 各画像の読み込み状態を追跡
  const [isLoading, setIsLoading] = useState(false); // データ取得中の状態

  const fetchMovies = async (offset = 0, limit = 10) => {
    try {
      const response = await axios.get(
        `https://kaitoportfolio.microcms.io/api/v1/movie?offset=${offset}&limit=${limit}`,
        {
          headers: {
            'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ',
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return { contents: [], totalCount: 0 };
    }
  };

  useEffect(() => {
    const loadAllMovies = async () => {
      setIsLoading(true);
      let allMovies = [];
      let offset = 0;
      const limit = 10; // APIで1回に取得する件数
      let totalCount = 0;

      do {
        const data = await fetchMovies(offset, limit);
        allMovies = [...allMovies, ...data.contents];
        totalCount = data.totalCount;
        offset += limit; // 次のページのオフセットを設定
      } while (offset < totalCount);

      setMovies(allMovies);
      setIsLoading(false);
    };

    loadAllMovies();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true })); // 画像が読み込まれたら状態を更新
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p> // ローディング中の表示
      ) : (
        <div className="movieArea">
          {movies.map((movie, index) => (
              <div className="movieItem">
                <h2>{movie.title}</h2>
                <a href={movie.url} key={index} target="_blank" rel="noopener noreferrer">
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
                </a>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movie;

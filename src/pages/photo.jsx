import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import '../styles/photo.css';

const Photo = () => {
  const [images, setImages] = useState([]);
  const [groupedImages, setGroupedImages] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 16; // 1ページあたりの表示件数

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://kaitoportfolio.microcms.io/api/v1/photolibrary', {
          headers: {
            'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ'
          },
          params: {
            limit: limit,
            offset: (currentPage - 1) * limit,
          }
        });
        if (currentPage === 1) {
          // currentPageが1の場合は新しいリストで上書き
          setImages(response.data.contents);
        } else {
          // currentPageが1でない場合は既存の画像リストに追加
          setImages(prevImages => [...prevImages, ...response.data.contents]);
        }
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [currentPage]); // currentPageが変わるたびに新しい画像を取得

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

  const handleImageLoad = (index) => {
    setLoadedImages(prevState => ({
      ...prevState,
      [index]: true,
    }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
                <img
                  src={image.photo.url}
                  alt={`Photo ${imgIndex + 1}`}
                  className={loadedImages[imgIndex] ? 'loaded' : ''}
                  onLoad={() => handleImageLoad(imgIndex)}
                />
              </div>
            ))
          : images.map((image, imgIndex) => (
              <div key={imgIndex} className="gallery-item">
                <img
                  src={image.photo.url}
                  alt={`Photo ${imgIndex + 1}`}
                  className={loadedImages[imgIndex] ? 'loaded' : ''}
                  onLoad={() => handleImageLoad(imgIndex)}
                />
              </div>
            ))}
      </Masonry>
      {/* ページネーションの条件付き表示 */}
      {images.length > 0 && currentPage < totalPages && (
        <div className="pagination">
          <button className='PaginationNav' onClick={() => handlePageChange(currentPage + 1)}>
            MOre
          </button>
        </div>
      )}
    </div>
  );
};

export default Photo;

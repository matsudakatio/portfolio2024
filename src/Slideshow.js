import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/slideshow.css';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // MicroCMSからデータを取得する関数
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://kaitoportfolio.microcms.io/api/v1/portfolio', {
          headers: {
            'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ'
          }
        });
        setImages(response.data.contents);
      } catch (error) {
        console.error('Error fetching data from MicroCMS:', error);
      }
    };

    fetchImages();

    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        setShow(true);
      }, 1000); // アニメーション時間（1秒）に合わせる
    }, 20000); // 3秒ごとに切り替え

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className="imgContainer">
            <img
                src={images[currentIndex].src.url}
                alt={images[currentIndex].title}
                className={`imgArea ${show ? 'show' : ''}`}
            />
    </div>
        <div className="overviewArea">
            <div className="left">
                <h2 className={`title ${show ? 'show' : ''}`}>
                    {images[currentIndex].title}
                </h2>

                <h3 className={`hurigana ${show ? 'show' : ''}`}>
                    {images[currentIndex].hurigana}
                </h3>
            </div>

            <div className="right">
                <div className={`place ${show ? 'show' : ''}`}>
                    <img src='/img/map.png' alt="map"/>
                    <h2>{images[currentIndex].place}</h2>
                </div>

                <h2 className={`day ${show ? 'show' : ''}`}>{images[currentIndex].day}</h2>
            </div>
        </div>
    </div>
  );
};

export default Slideshow;

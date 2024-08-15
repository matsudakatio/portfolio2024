import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/slideshow.css';
import codeText from './codeText'; // インポート

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [textComplete, setTextComplete] = useState(false);
  const [showImage, setShowImage] = useState(false);

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
  }, []);

  useEffect(() => {
    const lines = codeText.split('\n');
    let currentLine = 0;

    const interval = setInterval(() => {
      setVisibleLines(prevLines => [...prevLines, lines[currentLine]]);
      currentLine += 1;

      if (currentLine >= lines.length) {
        clearInterval(interval);
        setTextComplete(true);
      }
    }, 100); // 行を表示する間隔

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (textComplete && images.length > 0) {
      setShowImage(true);
      const interval = setInterval(() => {
        setShowImage(false);
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
          setShowImage(true);
        }, 500); // アニメーション開始までの遅延
      }, 20000); // 20秒ごとに切り替え

      return () => clearInterval(interval);
    }
  }, [textComplete, images.length]);

  if (images.length === 0) {
    return
    <div>
      <div className="imgContainer">
      Loading...
      </div>

    </div>;
  }

  return (
    <div>
      <div className="imgContainer">
        <div className="codeText">
          {visibleLines.map((line, index) => (
            <h3 key={index} className="line">
              {line}
            </h3>
          ))}

        </div>
        {textComplete && (
          <img
            src={images[currentIndex].src.url}
            alt={images[currentIndex].title}
            className={`imgArea ${showImage ? 'show' : ''}`}
          />
        )}

      <div className="heroArea">
          <div className="first">
            <h1 >DIRECTOR__</h1 >
            <h1 >PHOTOGRAPHER__</h1 >
            <h1 >CODER</h1 >
          </div>
        </div>
      </div>


      <p className="copyright">Copyright © Kaito Matsuda All Rights Reserved.</p>
    </div>
  );
};

export default Slideshow;

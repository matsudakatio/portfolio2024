import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/slideshow.css';
import codeText from './codeText'; // インポート

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [textComplete, setTextComplete] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(true); // ロード状態の管理

  const handleImageLoad = () => {
    setShowImage(true);
  };

  useEffect(() => {
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
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (textComplete && images.length > 0) {
      setShowImage(true);
      setLoading(false); // テキストと画像が準備できたらロード完了
      const interval = setInterval(() => {
        setShowImage(false);
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
          setShowImage(true);
        }, 500);
      }, 2000000);

      return () => clearInterval(interval);
    }
  }, [textComplete, images.length]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        const container = document.querySelector('.imgContainer');
        const loadingElement = document.querySelector('.loading');
        container.classList.add('visible');
        loadingElement.classList.add('hidden'); // loading要素を非表示にする
      }, 2000); // 2秒の待機時間を追加
    }
  }, [loading]);

  return (
    <>
      <div className="loading"><div className='loadingContent'>WELCOME_TO_MYPORTFOLIO</div></div>
      <div className="imgContainer">
        <div className="LeftArea">
          <div className="codeText">
            {visibleLines.map((line, index) => (
              <h3 key={index} className="line">{line}</h3>
            ))}
          </div>
          <div className="AreaFlex1">
            <Link to='/photo' className="Area1">
              <h1>Photography</h1>
              <p>Every perception of colour is an illusion, we do not see colours as they really are. In our perception they alter one another.</p>
              <p className="viewMore">ViewMORE</p>
            </Link>
            <Link to='/movie' className="Area2">
              <h1>MOvie</h1>
              <p>Every perception of colour is an illusion, we do not see colours as they really are. In our perception they alter one another.</p>
              <p className="viewMore">ViewMORE</p>
            </Link>
          </div>
        </div>

        <div className="RightArea">
          <div className="Area3">
            {textComplete && (
              <img
                src={images[currentIndex].src.url}
                alt={images[currentIndex].title}
                className={`imgArea ${showImage ? 'show' : ''}`}
                onLoad={handleImageLoad}
              />
            )}
          </div>
          <div className="Area4">
            <h1>A sample example title</h1>
            <h3>Another subtitle example</h3>
            <p>27 May 2024<br /><br />
              Color contrast is the difference in brightness between foreground and background colors. For accessibility purposes, aim for a 4.5:1 ratio between the foreground color (e.g. text, links, etc.) and the background color. This ratio ensures people with moderately low vision can tell the colors apart and see your content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;

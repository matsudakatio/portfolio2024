import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/home.css';
import codeText from './codeText'; // インポート

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [textComplete, setTextComplete] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(true); // ロード状態の管理
  const [loadingPercentage, setLoadingPercentage] = useState(0); // パーセンテージの状態を管理

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

      setLoadingPercentage(Math.floor((currentLine / lines.length) * 100)); // パーセンテージを更新

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

      return () => clearInterval(interval); // `interval` をクリア
    }
  }, [textComplete, images.length]);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        const container = document.querySelector('.imgContainer');
        const text = document.querySelector('.TextArea');
        const loadingElement = document.querySelector('.loading');
        if (container) {
          container.classList.add('visible');
          text.classList.add('visible');
        }
        if (loadingElement) {
          loadingElement.classList.add('hidden'); // loading要素を非表示にする
        }
      }, 2000); // 2秒の待機時間を追加

      return () => clearTimeout(timeout); // `timeout` をクリア
    }
  }, [loading]);

  return (
    <>
      <div className="loading">
        <div className="loadingContent">
            KAITO_MATSUDA<br />
            PORTFOLIO_SITE<br />
            {loadingPercentage}%
          </div>
      </div>
      <div className="imgContainer">
        {showImage && (
          <img
          className='TopImg'
            src={images[currentIndex].src.url}
            alt={images[currentIndex].title}
            onLoad={handleImageLoad}
          />
        )}
      </div>

      <div className='TextArea'>
        <div className='OnCenterTextArea'>
            <h2>MYPORTFOLIOSITE</h2>
            <p>
            Welcome to my portfolio site. I'm a student of computer systems at AIT.
            I'm a web developer and filmmaker visual direction based in AIchi, Japan. 
            Corporate videos, music videos, portraits, promotional videos, short films, company websites, event flyers, jacket designs,
            and personal websites are my main work.All communication messages can be sent via Instagram DM.CURRENTLY starting a team to produce short films. We are looking for members.
            <br />
            All inquiries contact:
            Instagram acount is <a href="https://www.instagram.com/kaito_matsuda_/">here</a>
            </p>
        </div>

        <div className='UnderCenterTextArea'>
            <h2>OtherContent</h2>
            <p>
            
            I started making videos at the age of 17 at Aichi Institute of Technology Meiden High School AMIDC. Currently participating in MOV研, E224
            <br />
            Mov研 is <a href="https://www.instagram.com/kaito_matsuda_/">here</a>
            <br />
            E224 is <a href="https://www.instagram.com/kaito_matsuda_/">here</a>
            </p>
        </div>

        <div className='Links'>
            <Link to="/movie" className="btn">Movie</Link>
            <Link to="/photo" className="btn">Photo</Link>
        </div>

      </div>
    </>
  );
};

export default Slideshow;

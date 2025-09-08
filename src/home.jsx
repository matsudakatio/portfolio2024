import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/home.css';
import codeText from './codeText'; // インポート
import mainVisual from './assets/img/web gray.mp4'; // メインビジュアルのインポート

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [textComplete, setTextComplete] = useState(false);
  const [loading, setLoading] = useState(true); // ロード状態の管理
  const [loadingPercentage, setLoadingPercentage] = useState(0); // パーセンテージの状態を管理
  const [videoLoaded, setVideoLoaded] = useState(false);

  // microCMSからデータを取得
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

  // テキストアニメーション
  useEffect(() => {
    const lines = codeText.split('\n');
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setLoadingPercentage(Math.floor(((currentLine + 1) / lines.length) * 100));
        currentLine += 1;
      } else {
        clearInterval(interval);
        setTextComplete(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  
  // ローディング完了の判定
  useEffect(() => {
    if (textComplete && videoLoaded) {
      setTimeout(() => {
        setLoading(false);
      }, 500); // 少し遅延させてスムーズに切り替え
    }
  }, [textComplete, videoLoaded]);

  // ローディング完了後の表示切り替え
  useEffect(() => {
    if (!loading) {
      const container = document.querySelector('.imgContainer');
      const text = document.querySelector('.TextArea');
      const loadingElement = document.querySelector('.loading');

      if (loadingElement) {
        loadingElement.classList.add('hidden');
      }
      if (container && text) {
        container.classList.add('visible');
        text.classList.add('visible');
      }
    }
  }, [loading]);


  return (
    <>
      {loading && (
        <div className="loading">
          <div className="loadingContent">
              KAITO_MATSUDA<br />
              PORTFOLIO_SITE<br />
              {loadingPercentage}%
            </div>
        </div>
      )}
      <div className={`imgContainer ${!loading ? 'visible' : ''}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className='TopImg'
          src={mainVisual}
          onCanPlay={() => setVideoLoaded(true)} // ビデオが再生可能になったら
        ></video>
      </div>

      <div className={`TextArea ${!loading ? 'visible' : ''}`}>
        <div className='OverTextArea'>
            <p className='name'>KAITO MATSUDA</p>
            04-08-05<br /><br />

            FILM DIRECTOR / CINEMATOGRAPHER <br />
            BASED IN AICHI NAGOYA
        </div>

        <div className='UnderTextArea'>
          <a className='icon' href="https://www.instagram.com/kaito_matsuda_/">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 32 32">
              <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"></path>
            </svg>
          </a>
          <br />
        </div>
      </div>
    </>
  );
};

export default Slideshow;
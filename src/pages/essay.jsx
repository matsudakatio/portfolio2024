import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/essay.css'; 

const Essay = () => {
  const [essays, setEssays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false); 
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
  const fetchEssays = async () => {
    try {
      const response = await axios.get('https://kaitoportfolio.microcms.io/api/v1/essays', {
        headers: {
          'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ'
        }
      });
      // ★ ここで取得したデータを逆順にしています
      const reversedEssays = [...response.data.contents].reverse();
      setEssays(reversedEssays);
    } catch (error) {
      console.error('Error fetching essays:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchEssays();
}, []);

  useEffect(() => {
    if (essays.length > 0 && !showContent) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2500); 

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 4000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [currentIndex, essays, showContent]);

  const handleNext = () => {
    if (currentIndex < essays.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowContent(false);
      setIsExiting(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowContent(false);
      setIsExiting(false);
    }
  };

  if (loading) {
    return <div className="essay-container"><p>Loading...</p></div>;
  }
  
  if (essays.length === 0) {
    return <div className="essay-container"><p>エッセイが見つかりませんでした。</p></div>;
  }

  const currentEssay = essays[currentIndex];

  return (
    <div className="essay-container">
      {showContent ? (
        <>
          <div className="essay-content">
            {/* ★ 2. 回数の表示方法を「総数 - 現在のインデックス」に変更 */}
            <div className="essay-number">{`#${essays.length - currentIndex}`}</div>
            <h1 className="essay-title">{currentEssay.title}</h1>
            <div className="essay-body" dangerouslySetInnerHTML={{ __html: currentEssay.body }} />
          </div>
          <div className="essay-navigation">
            <button onClick={handlePrev} disabled={currentIndex === 0}>前へ</button>
            <button onClick={handleNext} disabled={currentIndex === essays.length - 1}>次へ</button>
          </div>
        </>
      ) : (
        <div className={`essay-eyecatch ${isExiting ? 'exiting' : ''}`}>
          {currentEssay.eyecatch ? (
            <img src={currentEssay.eyecatch.url} alt={currentEssay.title} />
          ) : (
            <div className="no-image">画像がありません</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Essay;
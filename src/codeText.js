const codeText = `
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/slideshow.css';
import imgBackText from './imgBackText'; // インポート

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    // MicroCMSからデータを取得する関数
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://kaitoportfolio.microcms.io/api/v1/portfolio', {
          headers: {
            'X-API-KEY': 'D47K5TpPZfRzZCyXPPs2YxML9X5uOJyWAQdZ'
          }



`;

export default codeText;

import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Slideshow from './home';
import Essay from './pages/essay';
import About from './pages/about';
import Movie from './pages/movie';
import Photo from './pages/photo';



const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Slideshow />} />
        {/* <Route path="/works" element={<Works />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/essay" element={<Essay />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
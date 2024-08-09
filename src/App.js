import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Slideshow from './Slideshow';
import Works from './pages/works';
import About from './pages/about';



const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Slideshow />} />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
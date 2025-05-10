import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;

    if (location.pathname === '/photo') {
      body.style.backgroundColor = '#161616';
      body.style.color = '#eee'
    } else if (location.pathname === '/about') {
        body.style.backgroundColor = 'color(display-p3 0.11435 0.91557 0.4204)';
        body.style.color = '#161616'
    } else {
      body.style.backgroundColor = '';
      body.style.color = '';
    }
  }, [location]);
  

  return (
    <div className="headerContainer">

        <div className="mainTitle">
        <h1>
          <Link to='/'>KAITO MATSUDA<br className="titleBr" /> PORTFOLIO SITE</Link>
        </h1>
      </div>
      <div className="sideLink">
        <div className="HeaderNav"><h1><Link to='/photo'>PHotography</Link></h1></div>
        <div className="HeaderNav"><h1><Link to='/movie'>MOvie</Link></h1></div>
        {/* <div className="HeaderNav"><h1><Link to='/essay'>ESsay</Link></h1></div> */}
      </div>
    </div>
  );
};

export default Header;

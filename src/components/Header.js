import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';


const Header = () => {
    return(
        <div className="headerContainer">
            <div className="mainTitle"><h1><Link to='/'>KAITO MATSUDA<br className="titleBr" /> PORTFOLIO SITE</Link></h1></div>
            <div className="sideLink">
                {/* <div className="HeaderNav"><h1><Link to='/works'>WOrks</Link></h1></div> */}
                <div className="HeaderNav"><h1><Link to='/about'>ABout</Link></h1></div>
                <div className="HeaderNav"><h1><Link to='/photo'>PHoto</Link></h1></div>
                <div className="HeaderNav"><h1><Link to='/movie'>MOvie</Link></h1></div>
            </div>
        </div>
    );
};

export default Header;
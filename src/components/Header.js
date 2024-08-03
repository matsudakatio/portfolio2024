import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import styled from 'styled-components';



const HeaderContainer =styled.div`
    // border: 1px solid red;
    position: relative;

    text-align: center;
    line-height: 100px;
`;

const MainTitle = styled.h1`
    display: inline-block;
    vertical-align: middle;
    font-size: 32px;
`;

const SideLink = styled.div`
    display: flex;
    gap: 32px;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    line-height: 32px;
`;

const Header = () => {
    return(
        <HeaderContainer>
            <MainTitle>KAITO MATSUDA PORTFOLIO SITE</MainTitle>
            <SideLink>
                <div className="HeaderNav"><h1><Link to='/works'>WOrks</Link></h1></div>
                <div className="HeaderNav"><h1><Link to='/about'>ABout</Link></h1></div>
            </SideLink>
        </HeaderContainer>
    );
};

export default Header;
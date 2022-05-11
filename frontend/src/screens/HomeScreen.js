import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Video from "../videos/video.mp4";

const StyledContainer = styled.section`
  position: absolute;
  right: ${({ toggleMenu }) => `${toggleMenu ? `250px` : `0`}`};
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #111;
  transition: 0.5s;
  z-index: 2;
`;

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled.h2`
  position: absolute;
  top: 35%;
  left: 5%;
  color: #fff;
  font-size: 30px;
  text-transform: uppercase;
  cursor: pointer;
  @media (max-width: 991px) {
    font-size: calc(3vh + 1vw);
  }
`;

const StyledToggle = styled.div`
  position: absolute;
  top: 25%;
  right: 5%;
  width: 60px;
  height: 60px;
  background: ${({ toggleMenu }) =>
    `${
      toggleMenu
        ? `url(https://i.ibb.co/rt3HybH/close.png)`
        : `url(https://i.ibb.co/HrfVRcx/menu.png)`
    }`};
  background-repeat: no-repeat;
  background-size: ${({ toggleMenu }) => `${toggleMenu ? `25px` : `30px`}`};
  background-position: center;
  cursor: pointer;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  transform: rotateY(180deg);
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: sandybrown;
  mix-blend-mode: overlay;
`;

const StyledText = styled.div`
  position: relative;
  z-index: 10;
  padding: 4% 4%;
  text-align: left;
  & h2 {
    font-size: calc(2.5vw + 2.5vh);
    font-weight: 800;
    color: #fff;
    line-height: 1em;
    text-transform: uppercase;
    @media (max-width: 991px) {
      font-size: calc(3.2vw + 3.2vh);
    }
  }
  & h3 {
    font-size: calc(2vw + 2vh);
    font-weight: 700;
    color: #fff;
    line-height: 1em;
    text-transform: uppercase;
    @media (max-width: 991px) {
      font-size: calc(2.8vw + 2.8vh);
    }
  }
  & p {
    font-size: calc(1vw + 1vh);
    color: #fff;
    margin: 20px 0;
    font-weight: 400;
    max-width: 700px;
    @media (max-width: 991px) {
      font-size: calc(1.5vw + 1.5vh);
    }
  }
`;

const StyledCarsLink = styled(Link)`
  display: inline-block;
  font-size: calc(0.8vh + 0.8vw);
  background: #fff;
  padding: 10px 30px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  margin-top: 10px;
  color: #111;
  letter-spacing: 2px;
  transition: 0.2s;
  :hover {
    letter-spacing: 6px;
    color: black;
  }
  @media (max-width: 991px) {
    font-size: calc(1vw + 1vh);
  }
`;

const StyledMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 24px;
  color: #111;
  :hover {
    color: #fa5f55;
  }
`;

const HomeScreen = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <StyledContainer toggleMenu={toggleMenu}>
        <StyledHeader>
          <StyledLogo>car rental</StyledLogo>
          <StyledToggle
            toggleMenu={toggleMenu}
            onClick={() => setToggleMenu(!toggleMenu)}
          ></StyledToggle>
        </StyledHeader>
        <StyledVideo autoPlay loop muted controls preload="true">
          <source src={Video} type="video/mp4" />
        </StyledVideo>
        <StyledOverlay />
        <StyledText>
          <h2>Welcome to </h2>
          <h3>Exclusive car rental</h3>
          <p>
            Our company provides luxury car rental at the best price for any
            time You need. All our cars are in perfect condition and ready to
            go. You can reserve a car for your chosen time range via our website
            or by calling our offices directly. Our great customer service
            ensuring the satisfaction of our customers.
          </p>
          <StyledCarsLink to="/cars">Show cars</StyledCarsLink>
        </StyledText>
      </StyledContainer>
      <StyledMenu>
        <nav>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/cars">Cars</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
        </nav>
      </StyledMenu>
    </>
  );
};

export default HomeScreen;

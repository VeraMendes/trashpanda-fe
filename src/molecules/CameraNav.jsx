import React, { useState, useEffect } from "react";
import styled from "styled-components";
import searchIconLightMode from "../images/search_icon_camera_lite.svg";
import searchIconDarkMode from "../images/search_icon_camera_dark.svg";
import homeIconDarkMode from "../images/home_icon_camera_dark.svg";
import homeIconLightMode from "../images/home_icon_camera_lite.svg";
import { Link, useLocation, useHistory } from "react-router-dom";

import cameraBtnImgDarkMode from "../images/camera_icon_camera.svg";
import cameraBtnImgLightMode from "../images/camera_icon_camera_light.svg";

const Container = styled.div`
  max-width: 575px;
  width: 100vw;
  height: 56px;

  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 43px;
  z-index: 4;
  position: absolute;
  align-items: center;
  cursor: pointer;
  padding: 13px;

  left: 20%,
  bottom: 53px
`;

const InnerContainer = styled.div`
  margin: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  max-width: 573px;
`;

const CameraImage = styled.img`
  outline: none;
  border: none;
  background-color: none;
  box-shadow: 0px;
  padding: 0px;
  border-radius: 100px;
  z-index: 1;
  position: fixed;
  bottom: 10px;
  left: 50%;
  height: 13%;

  transform: translate(-50%, ${props => (props.isHome ? `6` : `-15`)}%);

  cursor: pointer;
`;

const CameraNav = ({ toggleShutterPress, toggleSearchFocus }) => {
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const theme = localStorage.getItem("theme");
  const [cameraBtn, setCameraBtn] = useState(cameraBtnImgLightMode);
  const [homeBtn, setHomeBtn] = useState(homeIconLightMode);
  const [searchBtn, setSearchBtn] = useState(searchIconLightMode);

  useEffect(() => {
    toggleSearchFocus(false);
  }, []);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  const handleBackClick = () => {
    history.push("/");
    toggleSearchFocus(true);
  };

  const handleCameraBtn = () => {
    //pass in the function that captures the base 64 on the canvas/CameraPage
    toggleShutterPress();
  };

  useEffect(() => {
    if (theme === "light") {
      setCameraBtn(cameraBtnImgLightMode);
      setHomeBtn(homeIconLightMode);
      setSearchBtn(searchIconLightMode);
    } else {
      setCameraBtn(cameraBtnImgDarkMode);
      setHomeBtn(homeIconDarkMode);
      setSearchBtn(searchIconDarkMode);
    }
  }, []);

  return (
    <Container>
      <InnerContainer>
        <CameraImage src={cameraBtn} onClick={handleCameraBtn} alt="camera" />

        {isHome ? null : (
          <Img
            onClick={handleBackClick}
            src={searchBtn}
            style={{
              zIndex: 7,
              position: "absolute",
              left: "4%",
              bottom: "-15px"
            }}
          />
        )}

        {isHome ? null : (
          <Link
            to="/"
            style={{
              zIndex: 7,
              position: "absolute",
              left: "80%",
              bottom: "53px"
            }}
          >
            <Img src={homeBtn} />
          </Link>
        )}
      </InnerContainer>
    </Container>
  );
};

export default CameraNav;
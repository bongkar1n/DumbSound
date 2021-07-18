import React, { useState } from "react";
import bgImage from "../images/Rectangle 1.svg";
import "../styles/Home.css";
import { Image, Card, Button, Container, Row, Col } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";
import dumbplay from "../images/DUMBSOUND.svg";
import Playlist from "../components/Playlist";
import PlaylistLoggedIn from "../components/PlaylistLoggedIn";

function Home() {
  const [loginShow, setLoginShow] = useState(false);
  const handleClickLogin = () => setLoginShow(!loginShow);

  const [registerShow, setRegisterShow] = useState(false);
  const handleClickRegister = () => setRegisterShow(!registerShow);

  return (
    <div className="main-background">
      <div>
        <Card className="bg-dark text-white card-continer-BgImage">
          <Card.Img src={bgImage} alt="Card image" />
          <Card.ImgOverlay>
            <div className="button-container ">
              <Image src={dumbplay} className="dumbplay-icon"></Image>
              <div style={{ display: "flex" }}>
                <div className="login">
                  <Button
                    onClick={handleClickLogin}
                    variant="dark"
                    className="button-click-login"
                  >
                    Login
                  </Button>
                </div>
                <div className="register">
                  <Button
                    onClick={handleClickRegister}
                    className="button-click"
                    variant="dark"
                  >
                    Register
                  </Button>
                </div>
                {loginShow ? <Login isOpen={loginShow} /> : null}
                {registerShow ? <Register isOpen={registerShow} /> : null}
              </div>
            </div>
            {/* <div className="main-top-container"> */}
            <div className="text-container">
              <Card.Title className="text-title-center">
                Connect on DumbSound
              </Card.Title>
              <Card.Text className="text-title-description">
                Discovery, Stream, and share a constantly expanding mix of music
                from emerging and major artists around the world
              </Card.Text>
            </div>
            {/* </div> */}
          </Card.ImgOverlay>
        </Card>
      </div>
      <div className="center-text-listen">
        <h1 style={{ color: "#EE4622" }}>Dengarkan dan Rasakan</h1>
      </div>

      <div className="main-body-wrapper">
        <PlaylistLoggedIn handleClickLogin={handleClickLogin} />
      </div>
      {/* <div className="footer">
        <h1> ini Footer</h1>
      </div> */}
    </div>
  );
}

export default Home;

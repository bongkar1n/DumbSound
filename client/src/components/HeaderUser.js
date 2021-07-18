import React from "react";
import { Navbar, Image, Nav } from "react-bootstrap";
import dumbplay from "../images/DUMBSOUND.svg";
import profile from "../images/profile.svg";
import { useHistory } from "react-router-dom";
import "../styles/HeaderUser.css";

function HeaderUser() {
  const history = useHistory();
  const handleToPlay = () => {
    history.push("/play");
  };

  // const backToHome = () => {
  //   history.push("/");
  // };
  return (
    <div>
      {/* bg="dark" variant="dark" */}
      <Navbar className="navbar-user">
        {/* <Container> */}
        <div className="header-container-user">
          <Navbar.Brand>
            <Image
              src={dumbplay}
              className="dumbplay-icon"
              onClick={handleToPlay}
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Image src={profile} className="profile-icon" />
          </Nav>
        </div>
        {/* </Container> */}
      </Navbar>
    </div>
  );
}

export default HeaderUser;

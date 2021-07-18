import React, { useRef, useState } from "react";
import { Navbar, Image, Nav, Button, Overlay, Popover } from "react-bootstrap";
import dumbplay from "../images/DUMBSOUND.svg";
import profile from "../images/profile.svg";
import { useHistory } from "react-router";
import "../styles/HeaderAdmin.css";
import {
  PopoverAddArtist,
  PopoverAddMusic,
  PopoverTransaction,
} from "./PopoverAdmin";

function HeaderAdmin() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleToAdmin = () => {
    history.push("/admin");
  };

  const handleToMusic = () => {
    history.push("/music");
  };

  const handleToArtist = () => {
    history.push("/artist");
  };
  let history = useHistory();

  const backToHome = () => history.push("/play");
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar-admin">
        {/* <Container> */}
        <div className="header-container">
          <Navbar.Brand onClick={backToHome}>
            <Image src={dumbplay} className="dumbplay-icon" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <div ref={ref}>
              <Image
                src={profile}
                className="profile-icon"
                onClick={handleClick}
              ></Image>

              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={20}
              >
                <Popover id="popover-contained">
                  <Popover.Content className="popover-content-profile">
                    <PopoverTransaction handleToAdmin={handleToAdmin} />
                    <PopoverAddMusic handleToMusic={handleToMusic} />
                    <PopoverAddArtist handleToArtist={handleToArtist} />
                  </Popover.Content>
                </Popover>
              </Overlay>
            </div>
          </Nav>
        </div>
        {/* </Container> */}
      </Navbar>
    </div>
  );
}

export default HeaderAdmin;

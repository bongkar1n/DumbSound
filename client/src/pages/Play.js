import React, { useState, useContext, useRef, useEffect } from "react";
import bgImage from "../images/Rectangle 1.svg";
import { UserContext } from "../context/UseContext";
import { useHistory } from "react-router-dom";

import "../styles/Play.css";
import {
  Image,
  Card,
  Button,
  Container,
  OverlayTrigger,
  Popover,
  Overlay,
} from "react-bootstrap";
import dumbplay from "../images/DUMBSOUND.svg";
import profile from "../images/profile.svg";
import Playlist from "../components/Playlist";
import PlaylistLoggedIn from "../components/PlaylistLoggedIn";
import {
  PopoverAddArtist,
  PopoverAddMusic,
  PopoverTransaction,
} from "../components/PopoverAdmin";
import { GiPayMoney } from "react-icons/gi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { API } from "../config/api";

function Home() {
  const path = "http://localhost:7000/uploads/";
  const history = useHistory();
  const [songs, setSongs] = useState([]);
  // const [song, setSong] = useState();

  const [state, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const loadSong = async () => {
    try {
      const response = await API.get("/song");
      console.log(response);
      setSongs(response.data.data);

      // const result = response.data.data.map((item) => ({
      //   name: item.title,
      //   singer: item.singer.name,
      //   cover: path + item.thumbnail,
      //   musicSrc: path + item.file,
      // }));
      // setSong(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToPayment = () => {
    history.push("/payment");
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

  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });

    history.push("/");
  };

  useEffect(() => {
    loadSong();
  }, []);

  console.log(songs);
  // console.log(song);
  return (
    <div>
      <div>
        <Card className="bg-dark text-white">
          <Card.Img src={bgImage} alt="Card image" />
          <Card.ImgOverlay>
            <div className="button-container ">
              <Image className="image-dumbsound" src={dumbplay}></Image>

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
                      {state.user.listAs === 1 && (
                        <div>
                          <PopoverTransaction handleToAdmin={handleToAdmin} />
                          <PopoverAddMusic handleToMusic={handleToMusic} />
                          <PopoverAddArtist handleToArtist={handleToArtist} />
                        </div>
                      )}
                      <div
                        className="container-popover-option"
                        onClick={handleToPayment}
                      >
                        <div>
                          <GiPayMoney size="3em" color="orange" />
                        </div>
                        <div style={{ width: "70%" }}>
                          <p className="text-popover-profile">Pay</p>
                        </div>
                      </div>
                      <div
                        className="container-popover-option-bottom"
                        onClick={handleLogOut}
                      >
                        <div>
                          <RiLogoutBoxRFill size="3em" color="orange" />
                        </div>
                        <div
                          style={{
                            width: "70%",
                          }}
                        >
                          <p className="text-popover-profile">Logout</p>
                        </div>
                      </div>
                    </Popover.Content>
                  </Popover>
                </Overlay>
              </div>
            </div>

            <div className="text-container">
              <Card.Title className="text-title-center">
                Connect on DumbSound
              </Card.Title>
              <Card.Text className="text-title-description">
                Discovery, Stream, and share a constantly expanding mix of music
                from emerging and major artists around the world
              </Card.Text>
            </div>
          </Card.ImgOverlay>
        </Card>
      </div>
      <div className="center-text-listen">
        <h1 style={{ color: "#EE4622" }}>Dengarkan dan Rasakan</h1>
      </div>

      <div className="main-body-wrapper">
        <PlaylistLoggedIn />
      </div>
      {/* <div className="footer">
        <MediaPlay audioLists={song} />
      </div> */}
    </div>
  );
}

export default Home;

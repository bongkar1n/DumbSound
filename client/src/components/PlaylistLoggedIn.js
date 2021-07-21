import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";

import "../styles/Playlist.css";
import MediaPlay from "./MediaPlay";
import { API } from "../config/api";
import { UserContext } from "../context/UseContext";
import { useHistory } from "react-router-dom";

function PlaylistLoggedIn(props) {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const path = "http://localhost:7000/uploads/";
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState();
  const [artists, setArtists] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [statusPayment, setStatusPayment] = useState();
  const [currentPlay, setCurrentPlay] = useState(0);

  const [showAudio, setShowAudio] = useState(false);
  const handleShowAudio = (id) => {
    if (showAudio) {
      setShowAudio(false);
      setCurrentPlay(id);
      setTimeout(() => setShowAudio(true), 500);
    } else {
      setShowAudio(true);
    }
  };
  const handleToPayment = () => {
    history.push("/payment");
  };

  const loadPayment = async () => {
    try {
      const response = await API.get("/allpayment");
      setPaymentList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSong = async () => {
    try {
      const response = await API.get("/song");
      setSongs(response.data.data);

      const result = response.data.data.map((item) => ({
        name: item.title,
        singer: item.singer.name,
        cover: path + item.thumbnail,
        musicSrc: path + item.file,
      }));
      setSong(result);
    } catch (error) {
      console.log(error);
    }
  };
  const loadArtist = async () => {
    try {
      const response = await API.get("/artists");
      setArtists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const matchPayment = async () => {
    try {
      const findData = await API.get(`/payment`);
      console.log(findData);
      setStatusPayment(findData.data.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    matchPayment();
    loadArtist();
    loadSong();
    loadPayment();
  }, []);

  console.log(paymentList);
  console.log(state);
  console.log(statusPayment);

  return (
    <div className="main-body-playlist-login">
      {songs.map((item, index) => (
        <Card
          key={index}
          style={{ width: "22rem" }}
          className="song-cover"
          onClick={
            state.isLogin
              ? statusPayment === "Approved"
                ? () => handleShowAudio(index)
                : handleToPayment
              : props.handleClickLogin

            // !state.isLogin ? (
            //   props.handleClickLogin
            // ) : (
            //   <>
            //     {statusPayment === "Approved"
            //       ? () => handleShowAudio(index)
            //       : handleToPayment()}
            //   </>
            // )
          }
        >
          <Card.Img variant="top" src={path + item.thumbnail} />
          <Card.Body className="card-body-login">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Title className="text-light">
                {item.title.length > 10
                  ? item.title.substring(0, 11) + "..."
                  : item.title}
              </Card.Title>
              <Card.Title className="text-light">{item.year}</Card.Title>
            </div>

            <Card.Text className="text-light mt-0">
              {item.singer.name}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      {/* <MediaPlay audioLists={song} show={showAudio} playIndex={currentPlay} /> */}
      {/* {state.isLogin && statusPayment === "Approved" ? (
          <div>
          <MediaPlay
          audioLists={song}
          show={showAudio}
          playIndex={currentPlay}
          />
          </div>
          ) : (
            <div onClick={handleToPayment}>
            <MediaPlay />
            </div>
          )} */}
      <div>
        {statusPayment === "Approved" && (
          <MediaPlay
            audioLists={song}
            show={showAudio}
            playIndex={currentPlay}
          />
        )}
      </div>
    </div>
  );
}

export default PlaylistLoggedIn;

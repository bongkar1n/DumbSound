import React from "react";
import { Card } from "react-bootstrap";
import exImage from "../images/exPlaylist.svg";
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import image4 from "../images/image4.png";
import image5 from "../images/image5.png";
import image6 from "../images/image6.png";
import image7 from "../images/image7.png";
import image8 from "../images/image8.png";
import image9 from "../images/image9.png";
import image10 from "../images/image10.png";
import image11 from "../images/image11.png";
import "../styles/Playlist.css";

function Playlist({ handleClickLogin }) {
  const images = [
    {
      image: image1,
      title: "Logic",
      singer: "Keanu Reaces",
      year: 2020,
    },
    {
      image: image2,
      title: "Never Ever ...",
      singer: "Eminem",
      year: 2020,
    },
    {
      image: image3,
      title: "Love U Be ...",
      singer: "Ty Dolla $ign",
      year: 2020,
    },
    {
      image: image4,
      title: "Tragic",
      singer: "QC ",
      year: 2020,
    },
    {
      image: image5,
      title: "Midsummer",
      singer: "88 Rising",
      year: 2020,
    },
    {
      image: image6,
      title: "Slow Dancing ..",
      singer: "Joji",
      year: 2020,
    },
    {
      image: image7,
      title: "History",
      singer: "Rich Brian",
      year: 2020,
    },
    {
      image: image8,
      title: "I LIKE U",
      singer: "Niki",
      year: 2020,
    },
    {
      image: image9,
      title: "Love Galore",
      singer: "SZA",
      year: 2020,
    },
    {
      image: image10,
      title: "End Of The ...",
      singer: "Boyz II Men",
      year: 2020,
    },
    {
      image: image11,
      title: "Circles",
      singer: "Post Malone",
      year: 2020,
    },
  ];
  return (
    <div className="main-body-playlist">
      {images.map((item, index) => (
        <Card
          key={index}
          style={{ width: "18rem" }}
          className="song-cover"
          onClick={handleClickLogin}
        >
          <Card.Img variant="top" src={item.image} />
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Card.Title className="text-light">{item.title}</Card.Title>
              <Card.Title className="text-light">{item.year}</Card.Title>
            </div>
            {/* <Card.Title className="text-light" style={{ color: "black" }}>
              {item.title}
            </Card.Title> */}
            <Card.Text className="text-light" style={{ color: "black" }}>
              {item.singer}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Playlist;

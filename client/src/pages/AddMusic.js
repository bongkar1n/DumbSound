import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import AddMusicForm from "../components/AddMusicForm";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/AddMusic.css";

function AddMusic() {
  return (
    <div>
      <HeaderAdmin />
      <AddMusicForm />
    </div>
  );
}

export default AddMusic;

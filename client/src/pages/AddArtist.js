import React from "react";
import AddArtistForm from "../components/AddArtistForm";
import HeaderAdmin from "../components/HeaderAdmin";
import { useHistory } from "react-router-dom";

function AddArtist() {
  let history = useHistory();
  const backToPlay = () => history.push("/play");
  return (
    <div>
      <HeaderAdmin />
      <AddArtistForm />
    </div>
  );
}

export default AddArtist;

import React from "react";
import { GiPayMoney } from "react-icons/gi";
import addMusic from "../images/addMusic.png";
import addArtist from "../images/addArtist.png";
import { GiBookmark } from "react-icons/gi";
import { BsMusicNoteList } from "react-icons/bs";
import { BsPersonPlusFill } from "react-icons/bs";

function PopoverAddArtist(props) {
  return (
    <div>
      <div className="container-popover-option" onClick={props.handleToArtist}>
        <div>
          <BsPersonPlusFill size="2.5em" color="orange" />
        </div>
        <div style={{ width: "70%" }}>
          <p className="text-popover-profile">Add Artist</p>
        </div>
      </div>
    </div>
  );
}

function PopoverTransaction(props) {
  return (
    <div>
      <div className="container-popover-option" onClick={props.handleToAdmin}>
        <div>
          <GiBookmark size="3em" color="orange" />
        </div>
        <div style={{ width: "70%" }}>
          <p className="text-popover-profile">Transaction</p>
        </div>
      </div>
    </div>
  );
}

function PopoverAddMusic(props) {
  return (
    <div>
      <div className="container-popover-option" onClick={props.handleToMusic}>
        <div>
          <BsMusicNoteList size="3em" color="orange" />
        </div>
        <div style={{ width: "70%" }}>
          <p className="text-popover-profile">AddMusic</p>
        </div>
      </div>
    </div>
  );
}

export { PopoverAddArtist, PopoverAddMusic, PopoverTransaction };

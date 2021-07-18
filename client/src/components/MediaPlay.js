import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import "../styles/MediaPlay.css";

function MediaPlay(props) {
  const options = {
    showDownload: false,
    mode: "full",
    showReload: false,
    showPlayMode: false,
    showThemeSwitch: false,
    toggleMode: true,
  };

  return (
    <ReactJkMusicPlayer
      playIndex={props.playIndex}
      audioLists={props.audioLists}
      {...options}
    />
  );
}

export default MediaPlay;
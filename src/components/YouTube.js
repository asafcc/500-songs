import React, { useContext } from "react";
import ReactPlayer from "react-player";
import DispatchContext from "../DispatchContext";

function YouTube({ videoID }) {
  const appDispatch = useContext(DispatchContext);
  function playNext() {
    appDispatch({ type: "nextSong" });
  }
  function pauseSong() {
    appDispatch({ type: "pauseSong" });
  }
  function playSong() {
    appDispatch({ type: "playSong" });
  }
  return (
    <ReactPlayer
      url={`https://www.youtube.com/embed/${videoID}`}
      playing={true}
      controls={true}
      onEnded={playNext}
      onPause={pauseSong}
      onPlay={playSong}
    />
  );
}

export default YouTube;

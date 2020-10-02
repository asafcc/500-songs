import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";

import playing from "../imgs/sound.gif";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function SongItem({ song }) {
  const number = song["No."];
  const { Interpret, Title } = song;
  const titleBold = <strong>{`${Title}`}</strong>;

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleClick(title, interpret, number) {
    appDispatch({
      type: "setSong",
      payload: { title, interpret, number },
    });
  }
  return (
    <ListGroup.Item
      action
      onClick={() => handleClick(titleBold.props.children, Interpret, number)}
      className={
        "d-flex justify-content-between " +
        (appState.number === number ? "selected" : "")
      }
    >
      <div>
        {`${number} `}
        {titleBold}
        {" - "}
        {Interpret}{" "}
      </div>
      {appState.number === number && appState.isPlaying ? (
        <img
          alt="playing-gif"
          style={{ maxHeight: "100%" }}
          className="playing-icon"
          src={playing}
        />
      ) : (
        ""
      )}
    </ListGroup.Item>
  );
}

export default SongItem;

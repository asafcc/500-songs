import React from "react";
import { ListGroup } from "react-bootstrap";
import SongItem from "./SongItem";

function SongsList({ songs }) {
  return (
    <ListGroup className="list-group">
      {songs.map((song, index) => (
        <SongItem key={index} song={song} />
      ))}
    </ListGroup>
  );
}

export default SongsList;

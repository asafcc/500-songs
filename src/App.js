import React, { useEffect, useState, useReducer } from "react";
import Papa from "papaparse";
import "./App.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import extractColors from "extract-colors";

import youtubeAPI from "./api/youtube";

//my comp
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import YouTube from "./components/YouTube";
import SongsList from "./components/SongsList";
import AnimateBackground from "./components/AnimateBackground";
import defaultImgCover from "./imgs/black.png";
function App() {
  function myReducer(state, action) {
    switch (action.type) {
      case "setSong":
        const title = action.payload.title;
        const interpret = action.payload.interpret;
        const artCover = action.payload.artCover;
        const number = action.payload.number;
        return {
          ...state,
          title,
          interpret,
          artCover,
          number,
        };
      case "nextSong":
        const nextSong = songs[parseInt(state.number) % 500];

        return {
          ...state,
          title: nextSong["Title"],
          interpret: nextSong["Interpret"],
          number: nextSong["No."],
        };

      case "playSong":
        return { ...state, isPlaying: true };
      case "pauseSong":
        return { ...state, isPlaying: false };
      default:
        return state;
    }
  }
  const [songs, setSongs] = useState([]);
  const [video, setVideo] = useState();
  const [state, dispatch] = useReducer(myReducer, {
    title: "",
    interpret: "",
    artCover: defaultImgCover,
    number: "",
    isPlaying: false,
  });

  const [colors, setColors] = useState();

  // fetch all 500 songs state from CSV file
  // set state to the first song
  useEffect(() => {
    let csvFilePath = require("./CSV/500Songs.csv");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: function (results) {
        setSongs(results.data);

        const title = results.data[0]["Title"];
        const interpret = results.data[0]["Interpret"];
        const number = results.data[0]["No."];
        dispatch({ type: "setSong", payload: { title, interpret, number } });
      },
    });
  }, []);

  // on title change fetch image
  useEffect(() => {
    if (state.title !== "") {
      let { title, interpret, number } = state;
      let searchTerm = interpret + "-" + title;
      async function fetchData() {
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${searchTerm}
            &entity=song&limit=1`
          )
          .then((res) => {
            const url = res.data.results[0].artworkUrl30;
            const artCover = url.replace(/30x30/, "500x500");
            extractColors("https://cors-anywhere.herokuapp.com/" + artCover, {
              crossOrigin: "anonymous",
              distance: 0.14,
            }).then((colors) => {
              setColors(colors);
            });
            dispatch({
              type: "setSong",
              payload: { title, interpret, artCover, number },
            });
          });
      }
      fetchData();
    }
  }, [state.title]);

  //fetch video by search params
  useEffect(() => {
    if (state.title !== "") {
      const fetchData = async () => {
        try {
          const response = await youtubeAPI.get("/search", {
            params: {
              q: `${state.title} ${state.interpret}`,
            },
          });
          setVideo(response.data.items[0].id.videoId);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [state.title]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="myContainer">
          <SongsList songs={songs} />
          <Container>
            <div className="frosted">
              <h1>
                The Rolling Stones' 500 Greatest Songs of all Time
                <span role="img" aria-label="headset-emoji">
                  {" "}
                  🎧
                </span>
              </h1>
              <h4 className="py-2">
                Now Playing Song #{state.number}: "{state.title}" By{" "}
                {state.interpret}
              </h4>
              <YouTube videoID={video} />

              <img
                alt="art-cover"
                className="artCover"
                src={state.artCover ? state.artCover : defaultImgCover}
              />
            </div>
          </Container>
          {colors ? <AnimateBackground colors={colors} /> : ""}
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;

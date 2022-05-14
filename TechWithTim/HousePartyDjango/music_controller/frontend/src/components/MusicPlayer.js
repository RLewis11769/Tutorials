import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default function MusicPlayer(song_data) {
  //

  // Determine what % of song has played
  let songProgress = (song_data.time / song_data.duration) * 100;

  const playSong = () => {
    // Function to send put request to server to pause song
    console.log("Play song");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    // Just send request, don't care about response for now
    fetch("/spotify/play", requestOptions);
  }

  const pauseSong = () => {
    // Function to send put request to server to pause song
    console.log("Pause song");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    // Just send request, don't care about response for now
    fetch("/spotify/pause", requestOptions);
  }

  const skipSong = () => {
    // Function to send post request to server to skip song
    console.log("Skip song");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    fetch("/spotify/skip", requestOptions);
  }

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={song_data.image_url} height="100%" width="100%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {song_data.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {song_data.artist}
          </Typography>
          <div>
            <IconButton
              onClick={() => {
                song_data.is_playing ? pauseSong() : playSong();
              }}
            >
              {song_data.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <Typography component="h5" variant="h5">
            {song_data.votes} / {song_data.votes_needed}
            </Typography>
            <IconButton onClick={()=> skipSong()}>
              <SkipNextIcon /> 
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} style={{ marginBotton: "3rem" }}/>
    </Card>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CreateUpdateRoom from "./CreateUpdateRoom";
import MusicPlayer from "./MusicPlayer";

export default function Room(props) {
  // Main page for application - 

  // Setting local state - variable, function, and default value
  const [options, setOptions] = useState({
    guestCanPause: true,
    votesToSkip: 2,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
    song: {},
  });

  // Save history of current page to be used for redirect
  let history = useHistory();

  // Route in HomePage.py keeps track of roomCode to save which parameter matches
  const roomCode = props.match.params.roomCode;
  getRoomData(props);

  function getRoomData(props) {
    // Send get request to server
    fetch(`/api/get-room?code=${roomCode}`)
      // If can't get room code, it's because we've logged out so redirect to home page
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback();
          history.push("/");
        }
        // Convert response to JSON
        return response.json();
      })
      .then((data) => {
        console.log("Return response");
        // Set values of options object to data returned from server
        setOptions({
          ...options,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        // if (options.isHost) {
        //   console.log("host");
        //   authenticateSpotify();
        // }
        // getSongData();
      });
    // Check if host has authenticated spotify/start process
    if (options.isHost) {
      console.log("host");
      authenticateSpotify();
    };
  };

  // const setRoomDetailsAsState = async (data) => {
  //   // Set state to value of data given
  //   console.log("set state");
  //   console.log(data);
  //   setOptions({
  //     ...options,
  //     votesToSkip: data.votes_to_skip,
  //     guestCanPause: data.guest_can_pause,
  //     isHost: data.is_host,
  //   });
  // };

  const setShowSettings = (value) => {
    // Set settings option to value - determine if showing "settings" button for host
    console.log("set show settings");
    setOptions({
      ...options,
      showSettings: value,
    });
  };

  function authenticateSpotify() {
    console.log("authenticate spotify");
    // Start process to authenticate spotify
    // First see if already authenticated
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setOptions({
          ...options,
          spotifyAuthenticated: data.status,
        });
        // If not authenticated, get url to authenticate
        if (!data.status) {
          fetch("/spotify/get-url")
            .then((response) => response.json())
            .then((data) => {
              // Redirect to spotify authentication page which will start authentication process
              window.location.replace(data.url);
            });
          // Note that if user is already authenticated, only first fetch will be made and nothing will be updated
        }
      });
  }

  function getSongData() {
    // Get song data from server
    fetch("/spotify/current-song")
      .then((response) => {
        // If no song playing, return
        if (!response.ok) {
          return {};
        } else {
          // If song is playing, retrieve it
          return response.json();
        }
      })
      .then((data) => {
        // Set song data in state so can view/have it on this page
        setOptions({
          ...options,
          song: data,
        });
        // console.log(data);
      });
  }

  useEffect(() => {
    // Get song data from server every second
    // Note: Spotify's API doesn't allow for websockets so we have to poll
    const interval = setInterval(() => {
      getSongData();
    }, 1000);
    // Happens when component is first mounted
  }, []);

  function handleLeaveRoom(props) {
    // Send POST request of options to api/create to create room
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    // Send post request to api/create
    fetch("/api/leave-room", requestOptions).then((_response) => {
      // Redirect to home page
      history.push("/");
    });
  }

  function RenderSettingsButton() {
    // If isHost, show settings button
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSettings(true)}
        >
          Show Settings
        </Button>
      </Grid>
    );
  }

  function RenderSettings() {
    // If isHost and showSettings, show settings
    // Note: this is all on the same room page - not redirecting to special settings page
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateUpdateRoom
            update={true}
            votesToSkip={options.votesToSkip}
            guestCanPause={options.guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomData}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowSettings(false)}
          >
            Close Settings
          </Button>
        </Grid>
      </Grid>
    );
  }

  // Actual rendering of component depending if showSettings is true or false
  if (options.showSettings) {
    return <RenderSettings />;
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer song_data{...options.song} />
      {options.isHost ? <RenderSettingsButton /> : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={handleLeaveRoom}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

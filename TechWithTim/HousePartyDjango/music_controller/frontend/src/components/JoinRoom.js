import React from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function JoinRoom() {
  // Material UI styling component, hooks, and helper functions for JoinRoom page

  // Setting local state - variable, function, and default value
  const [roomCode, setRoomCode] = useState({
    code: "",
    errorMsg: "",
    error: false,
  });

  // Save history of current page to be used for redirect
  let history = useHistory();

  const handleCodeChange = (e) => {
    // Set state of object at votesToSkip to value of input
    setRoomCode((roomCode) => ({
      // Spread operator syntax to copy object
      ...roomCode,
      // Set value of votesToSkip key to value of number type TextField
      code: e.target.value,
    }));
  };

  function handleEnterRoom(props) {
    // Send POST request of options to api/create to create room
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Convert to JSON bc api/views.py is getting values from these keys
        code: roomCode.code,
      }),
    };
    // Send post request to api/create
    fetch("/api/join", requestOptions)
      // Convert response to JSON
      .then((response) => {
        if (response.ok) {
          // Redirect to room page with room code as parameter
          history.push(`/room/${roomCode.code}`);
        } else {
          // If response is not ok, set error to response text
          setRoomCode({
            ...roomCode,
            error: true,
            errorMsg: "Room not found",
          })
      .catch((error) => console.log(error));
        }
      });
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={roomCode.error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode.code}
          helperText={roomCode.errorMsg}
          variant="outlined"
          onChange={handleCodeChange}
        >
          Enter Room
        </TextField>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handleEnterRoom}>
          Join
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

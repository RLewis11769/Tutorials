import React from "react";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import {
  Button,
  Grid,
  Collapse,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core/";
// import TextField from "@material-ui/core/TextField";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function CreateUpdateRoom({
  votesToSkip = 2,
  guestCanPause = true,
  update = false,
  roomCode = null,
  updateCallback = () => {},
}) {
  // Material UI styling component, hooks, and helper functions for CreateRoom page

  // Setting local state - variable, function, and default value
  const [options, setOptions] = useState({
    guestCanPause: guestCanPause,
    votesToSkip: votesToSkip,
  });

  // Setting different state - string for notification message
  let [message, setMessage] = useState("");

  // Save history of current page to be used for redirect
  let history = useHistory();

  // Get title for both creating and updating room
  const title = update ? "Update Room" : "Create Room";

  function RenderCreateButtons() {
    // Render buttons for host to create a room
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateRoom}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  function RenderUpdateButtons() {
    // Render buttons for host to update a room
    return (
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleUpdateRoom}>
          Update Room
        </Button>
      </Grid>
    );
  }

  const handleVotesChange = (e) => {
    // Set state of object at votesToSkip to value of input
    setOptions((options) => ({
      // Spread operator syntax to copy object
      ...options,
      // Set value of votesToSkip key to value of number type TextField
      votesToSkip: e.target.value,
    }));
  };

  const handlePauseOptionChange = (e) => {
    // Set state of object at guestCanPause to value of radio button
    setOptions((options) => ({
      // Spread operator syntax to copy object
      ...options,
      // Ternary to set value to RadioGroup value
      guestCanPause: e.target.value === "true" ? true : false,
    }));
  };

  function handleCreateRoom(props) {
    // Send POST request of options to api/create to create room
    console.log("handleCreateRoom");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // These are values defined in api/models but specifically used in api/views
        // Need to convert to JSON bc api/views.py is getting values from these keys
        votes_to_skip: options.votesToSkip,
        guest_can_pause: options.guestCanPause,
      }),
    };
    // Send post request to api/create
    fetch("/api/create", requestOptions)
      // Convert response to JSON
      .then((response) => response.json())
      .then((data) => {
        console.log(`Redirect to ${data.code}`);
        // Redirect to room page with room code as parameter
        history.push(`/room/${data.code}`);
      });
  }

  function handleUpdateRoom(props) {
    // Send PATCH request of options to api/create to create room
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Sending to api/views.py so values are snake_case for python
        votes_to_skip: options.votesToSkip,
        guest_can_pause: options.guestCanPause,
        code: roomCode,
      }),
    };
    // Send patch request to api/create
    fetch("/api/update-room", requestOptions)
      // Update state of message to notify user of success/failure
      .then((response) => {
        if (response.ok) {
          handleUpdateMessage("Success!");
        } else {
          handleUpdateMessage("Unable to update room");
        }
        // This is updating it but not refreshing!
        //  I suspect this is because I should pass it data but I'm using a useEffect and calling the callback inside it
        // I should probably have a useEffect that rerenders the component but I'm not sure how
        updateCallback();
      });
  }

  const handleUpdateMessage = (msg) => {
    // Set state of message to msg
    setMessage(msg);
  };

  return (
    // Use Material UI to build out structure of /create page that is used for both create and update
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={message != ""}>
          {
            (message = "Success!" ? (
              <Alert severity="success" onClose={() => handleUpdateMessage("")}>
                {message}
              </Alert>
            ) : (
              <Alert severity="error">{message}</Alert>
            ))
          }
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component="div">
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={handlePauseOptionChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={handleVotesChange}
          />
          <FormHelperText component="div">
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {update ? RenderUpdateButtons() : RenderCreateButtons()}
    </Grid>
  );
}

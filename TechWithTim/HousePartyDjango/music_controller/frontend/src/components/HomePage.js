import React from "react";
import { useState, useEffect } from "react";
import CreateUpdateRoom from "./CreateUpdateRoom";
import JoinRoom from "./JoinRoom";
import Room from "./Room";
import Info from "./Info";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";


export default function HomePage() {
  // Material UI rendering of homepage as used in HomePage return
  const [userInRoom, setUserInRoom] = useState({
    roomCode: null,
  });

  function RenderHomePage() {
    // Material UI rendering of homepage as used in HomePage return
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography component="h3" variant="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join Room
            </Button>
            <Button color="primary" to="/create" component={Link}>
              Create Room
            </Button>
            <Button color="secondary" to="/info" component={Link}>
              Help
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCodeAsState(data);
      });
  }, []);

  const setRoomCodeAsState = (data) => {
    // Set state to value of TextField
    setUserInRoom({
      ...userInRoom,
      roomCode: data.roomCode,
    });
  };

  const clearRoomCode = () => {
    // Set state to value of TextField
    setUserInRoom({
      ...userInRoom,
      roomCode: null,
    });
  };

  // Defines routes able to access from homepage
  // Switch is kind of like switch statement (which is why need "exact")
  // Each route path defines components rendered with path from homepage
  // This is defining in React, define in Django in urls.py
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return userInRoom.roomCode ? (
              <Redirect to={`/room/${userInRoom.roomCode}`} />
            ) : (
              <RenderHomePage />
            );
          }}
        />
        <Route path="/join" component={JoinRoom} />
        <Route path="/create" component={CreateUpdateRoom} />
        <Route path="/info" component={Info} />
        <Route path="/room/:roomCode" render={(props) => {
          return <Room {...props} leaveRoomCallback={clearRoomCode} />;
        }}/>
      </Switch>
    </Router>
  );
}

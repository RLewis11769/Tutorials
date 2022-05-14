import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info(props) {
  //

  // Set page state hook
  const [page, setPage] = useState(pages.JOIN);

  function RenderJoinInfo() {
    // Rendering for pages.join
    return (<p>Join</p>);
  }

  function RenderCreateInfo() {
    // Rendering for pages.create
    return (<p>Create</p>);
  }

  useEffect(() => {
    // Set page state hook
    setPage(props.page);
  });

  // Material UI rendering of /info page
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h5" component="h4">
          What is House Party Music Controller?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1" component="p">
          {page === pages.JOIN ? <RenderJoinInfo /> : RenderCreateInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" component={Link} to="/">
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

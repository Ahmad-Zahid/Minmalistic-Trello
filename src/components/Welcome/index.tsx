// Packages
import {  ReactElement, useEffect } from "react";
import { Typography } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";


// Components
import Login from "../Auth/LogIn";

// Stylesheet
import { useStyle } from "./styles";

export default function Welcome(): ReactElement {
  const classes: any = useStyle();
 
  return (
    <div className={classes.container}>
      <Typography variant="h2" gutterBottom className={classes.text}>
        Welcome to Trello
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.text}>
        Get Started with Trello by creating a new board!
      </Typography>
    
      <Login />
    </div>
  );
}

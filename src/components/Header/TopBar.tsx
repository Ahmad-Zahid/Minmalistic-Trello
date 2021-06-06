// Packages
import React from "react";
import { Typography } from "@material-ui/core";

// Stylesheet
import { useStyle } from "./styles";

export default function TopBar({
  title,
}: {
  title: string;
}): React.ReactElement {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
    </div>
  );
}

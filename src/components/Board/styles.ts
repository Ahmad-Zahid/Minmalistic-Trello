import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
      background: "green",
      width: "100%",
      overflowY: "auto",
    },
    listContainer: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    my: {
      display: "flex",
      columns: 4,
    },
  }));
  
import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(2),
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      flexGrow: 1,
    },
  }));
  
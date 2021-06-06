import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(2, 2, 2, 2),
      margin: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
    },
  }));
  
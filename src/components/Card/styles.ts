import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(2, 2, 2, 2),
      margin: theme.spacing(2),
      display: "flex",
      justifyContent: "space-between",
    },
    icons:{
      '&:hover': {
        background: "#f00",
     },
    },
    storypointContainer:{
      display: "flex",
      height: "1.5vw",
      width: "1.5vw",
      backgroundColor: "orange",
      borderRadius: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft:5
    },
    rowContainer:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }
  }));
  
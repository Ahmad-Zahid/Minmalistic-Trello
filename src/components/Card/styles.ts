import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 2, 2, 2),
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  icons: {
    '&:hover': {
      background: "#f00",
    },
  },
  storypointContainer: {
    display: "flex",
    backgroundColor: "orange",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    height: '25px',
    width: '25px',
  },

  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
}));

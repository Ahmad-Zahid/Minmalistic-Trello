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
  row: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "1vw",
    alignItems: "center",
  },
  filterTitle: { fontWeight: "bold", fontSize: "1.5rem" }
}));

export const styles = {
  container: (css: any) => ({ ...css, width: "200px" }),
};

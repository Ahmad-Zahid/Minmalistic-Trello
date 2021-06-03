// Packages
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));
export default function Title({
  title,
}: {
  title: string;
}): React.ReactElement {
  const classes: any = useStyle();
  return (
    <div>
      <div className={classes.editableTitleContainer}>
        <Typography className={classes.editableTitle}>{title}</Typography>
      </div>
    </div>
  );
}

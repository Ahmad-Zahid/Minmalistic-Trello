// Packages
import { Typography } from "@material-ui/core";

// Stylesheet
import { useTitleStyle } from "./styles";

export default function Title({
  title,
}: {
  title: string;
}): React.ReactElement {
  const classes: any = useTitleStyle();
  return (
    <div>
      <div className={classes.editableTitleContainer}>
        <Typography className={classes.editableTitle}>{title}</Typography>
      </div>
    </div>
  );
}

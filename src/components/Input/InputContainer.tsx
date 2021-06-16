// Packages
import { useState, ReactElement } from "react";
import { Paper, Typography, Collapse } from "@material-ui/core";

// Components
import InputCard from "./InputCard";

// Stylesheet
import { useInputContainerStyle } from "./styles";
interface InputContainerProps {
  listId: string;
  type: string;
}
export default function InputContainer({
  listId,
  type,
}: InputContainerProps): ReactElement {
  const classes = useInputContainerStyle();
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <InputCard setOpen={setOpen} listId={listId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <Paper
          className={classes.addCard}
          elevation={0}
          onClick={() => setOpen(!open)}
        >
          <Typography>
            {type === "card" ? "+ Add a Card" : "+ Add another List"}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
}

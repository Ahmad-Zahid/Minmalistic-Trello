// Packages
import React, { useContext } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { Delete } from "@material-ui/icons";

// Utils
import context from "../../utils/context";

// Types
import { UserType } from "../../constants/types";

// Stylesheet
import { useStyle } from "./styles";
interface CardProps {
  card: {
    id: string;
    title: string;
    user: UserType;
  };
  index: number;
}
export default function Card({ card, index }: CardProps): React.ReactElement {
  const classes = useStyle();
  const { removeCard } = useContext(context);
  const { user, title, id } = card;
  const { name } = user;
  

  const handleClick = () => {
    removeCard(card);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>
            <Typography>{title}</Typography>
            <Typography>{name ? name.first : ""}</Typography>
            <Delete onClick={handleClick} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

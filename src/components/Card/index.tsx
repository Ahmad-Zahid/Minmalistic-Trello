import React, { useContext } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import { Delete } from "@material-ui/icons";
import storeApi from "../../utils/context";

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2, 2, 2, 2),
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface CardProps {
  card: {
    id: string;
    title: string;
    user: any;
  };
  index: number;
}
export default function Card({ card, index }: CardProps): React.ReactElement {
  const classes = useStyle();
  const { removeCard } = useContext(storeApi);

  const handleClick = () => {
    removeCard(card);
  };
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>
            <Typography>{card.title}</Typography>
            <Typography>
              {card.user.name ? card.user.name.first : ""}
            </Typography>
            <Delete onClick={handleClick} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Title from "./Title";
import Card from "../Card";
import InputContainer from "../Input/InputContainer";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(1),
    },
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: Array<any>;
  };
  index: number;
}
export default function List({ list, index }: ListProps): React.ReactElement {
  const classes = useStyle();
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <Title title={list.title} />
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {list.cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer listId={list.id} type="card" />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

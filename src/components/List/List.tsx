// Packages
import { ReactElement } from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { Droppable, Draggable } from "react-beautiful-dnd";

// Components
import Title from "./Title";
import Card from "../Card";
import InputContainer from "../Input/InputContainer";

// Stylesheet
import {useListStyle} from './styles'

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: Array<any>;
  };
  index: number;
}
export default function List({ list, index }: ListProps): ReactElement {
  const classes = useListStyle();
  const { title, id, cards } = list;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div key={index}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <Title title={title} />
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <Droppable droppableId={id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.cardContainer}
                  >
                    {cards.map((card, index) => (
                      <Card key={card.id} card={card} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <InputContainer listId={id} type="card" />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

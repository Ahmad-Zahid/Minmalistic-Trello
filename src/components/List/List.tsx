// Packages
import { ReactElement, lazy, Suspense } from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { Droppable, Draggable } from "react-beautiful-dnd";

// Components
const Title = lazy(() => import("./Title"));
const Card = lazy(() => import("../Card"));
const InputContainer = lazy(() => import("../Input/InputContainer"));

// Stylesheet
import { useListStyle } from "./styles";

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

  const loading = () => <div>Loading...</div>;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div key={index}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <Suspense fallback={loading}>
              <Title title={title} />
            </Suspense>
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <Droppable droppableId={id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.cardContainer}
                  >
                    {cards.map((card, index) => (
                      <Suspense fallback={loading}>
                        <Card key={card.id} card={card} index={index} />
                      </Suspense>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <Suspense fallback={loading}>
              <InputContainer listId={id} type="card" />
            </Suspense>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}

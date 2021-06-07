// Packages
import { ReactElement, lazy, Suspense, useEffect } from "react";
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
  currentlyDragged: string;
  allLists: any;
  moving: any;
}
export default function List({
  list,
  index,
  currentlyDragged,
  allLists,
  moving,
}: ListProps): ReactElement {
  const classes = useListStyle();
  const { title, id, cards } = list;

  const isDropabble = () => {
    if (currentlyDragged !== "")
      if (allLists[currentlyDragged].restricted.includes(list.id)) return true;
    return false;
  };
  useEffect(() => {
    isDropabble();
  }, [moving]);

  const loading = () => <div>Loading...</div>;

  return (
    <div key={index}>
      <Paper className={classes.root}
      style={isDropabble() ? { backgroundColor: "lightgray" } : {}}
      >
        <CssBaseline />
        <Suspense fallback={loading}>
          <Title title={title} />
        </Suspense>
        <Draggable draggableId={id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              
              ref={provided.innerRef}
            >
              <Droppable isDropDisabled={isDropabble()} droppableId={id}>
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
          )}
        </Draggable>

        <Suspense fallback={loading}>
          <InputContainer listId={id} type="card" />
        </Suspense>
      </Paper>
    </div>
  );
}

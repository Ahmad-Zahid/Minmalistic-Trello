// Packages
import { ReactElement } from "react";
import { Droppable } from "react-beautiful-dnd";

// Components
import List from "../../components/List/List";
import InputContainer from "../../components/Input/InputContainer";

// Stylesheet
import { useStyle } from "./styles";

// Types
import { types } from "../../constants/listsData";

interface BodyTypes {
  filteredData: types;
  currentlyDragged: string;
  moving: any;
}

const Body = ({
  filteredData,
  currentlyDragged,
  moving,
}: BodyTypes): ReactElement => {
  const classes = useStyle();

  return (
    <Droppable droppableId="app" type="list" direction="horizontal">
      {(provided) => (
        <div
          className={`${classes.listContainer} ${classes.my}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filteredData.listIds.map(
            (listId: string | number, index: number) => {
              const list = filteredData.lists[listId];
              return (
                <List
                  list={list}
                  index={index}
                  currentlyDragged={currentlyDragged}
                  allLists={filteredData.lists}
                  moving={moving}
                />
              );
            }
          )}
          <InputContainer type="list" listId={"x"} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Body;

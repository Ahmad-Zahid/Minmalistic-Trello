// Packages
import { useState, useEffect, ReactElement } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

// Components
import TopBar from "../Header/TopBar";
import List from "../../components/List/List";
import InputContainer from "../../components/Input/InputContainer";

// Constants
import constantData, { types } from "../../constants/listsData";

// Utils
import StoreApi from "../../utils/context";

// Actions
import { getUsers } from "../../store/users/actions";

// Stylesheet
import { useStyle } from "./styles";

export default function Board(): ReactElement {
  let localData = localStorage.getItem("user");
  let persistedData: any = localStorage.getItem("data");
  if (localData) localData = JSON.parse(localData);
  if (persistedData) persistedData = JSON.parse(persistedData);
  else persistedData = constantData;

  const dispatch = useDispatch();
  const [data, setData] = useState<types>(persistedData);
  const preferences: any = localData;
  const classes = useStyle();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUsers());
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addMoreCard = (title: string, listId: string, user: any) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
      user: user,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const editOrRemoveCard = (card: any, type: string) => {
    const temp = { ...data };
    for (const currentList in data.lists) {
      for (const listItem in data.lists[currentList]) {
        const cardIndex = data.lists[currentList].cards.findIndex(
          (itemx) => itemx.id === card.id
        );
        if (type === "edit") temp.lists[currentList].cards[cardIndex] = card;
        else if (cardIndex > -1)
          temp.lists[currentList].cards.splice(cardIndex, 1);
      }
    }
    setData(temp);
  };

  const addMoreList = (title: string) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
      user: {},
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
  };

  const validations = (source: string, destination: any) => {
    switch (source) {
      case "list-1":
        if (
          destination === "list-3" ||
          destination === "list-4" ||
          destination === "list-5" ||
          destination === "list-6" ||
          destination === "list-7"
        )
          return false;
        return true;
      case "list-2":
        if (
          destination === "list-5" ||
          destination === "list-6" ||
          destination === "list-7"
        )
          return false;
        return true;
      case "list-3":
        if (destination === "list-6" || destination === "list-7") return false;
        return true;
      case "list-4":
        if (
          destination === "list-3" ||
          destination === "list-6" ||
          destination === "list-7"
        )
          return false;
        return true;
      case "list-5":
        if (
          destination === "list-3" ||
          destination === "list-6" ||
          destination === "list-7"
        )
          return false;
        return true;
      case "list-6":
        if (
          destination === "list-2" ||
          destination === "list-4" ||
          destination === "list-5"
        )
          return false;

        return true;
      case "list-7":
        return false;
    }
  };
  const onDragEnd = (result: DropResult): undefined | void => {
    const { destination, source, draggableId, type } = result;
    if (!validations(source.droppableId, destination?.droppableId)) return;
    if (!destination) {
      return;
    }
    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card: { id: any }) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newSate = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newSate);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      setData(newState);
    }
  };

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, editOrRemoveCard }}>
      <div
        className={classes.root}
        style={{ backgroundColor: preferences.color }}
      >
        <TopBar title={preferences.boardTitle} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div
                className={`${classes.listContainer} ${classes.my}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <List list={list} key={listId} index={index} />;
                })}
                <InputContainer type="list" listId={"x"} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </StoreApi.Provider>
  );
}

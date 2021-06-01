import  { useState, useEffect ,ReactElement} from "react";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import List from "../../components/List/List";
import constantData, { types } from "../../constants/data";
import StoreApi from "../../utils/context";
import InputContainer from "../../components/Input/InputContainer";
import { fetchUsers } from "../../service/api";
import { useLocation } from "react-router";
import TopBar from "../Header/TopBar";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "green",
    width: "100%",
    overflowY: "auto",
  },
  listContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      // columnCount:3
    },
  },
  my: {
    display: "flex",
    columns: 4,
  },
}));

export default function Board(): ReactElement {

  let localData = localStorage.getItem("user");
  console.log('localData',localData)

  if (localData) localData = JSON.parse(localData);
  console.log('localData',localData)
  const [preferences, setPreferences] = useState<any>(localData);
  const [data, setData] = useState<types>(constantData);
  const [users, setUsers] = useState<any>([]);
  const location: any = useLocation();
  const classes = useStyle();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      if (data) setUsers(data.results);
    };
    fetchData();
  }, []);
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
    // console.log('state',newState)
    setData(newState);
  };
  const removeCard = (card: any) => {
    const temp = { ...data };
    for (const item in data.lists) {
      for (const listItem in data.lists[item]) {
        const deleteIndex = data.lists[item].cards.findIndex(
          (itemx) => itemx.id === card.id
        );
        if (deleteIndex > -1) temp.lists[item].cards.splice(deleteIndex, 1);
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
    // console.log("destination", destination, "source", source, draggableId);
    // console.log(validations(source.droppableId, destination?.droppableId));
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
    <StoreApi.Provider value={{ addMoreCard, addMoreList, removeCard, users }}>
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

// Packages
import { useState, useEffect, ReactElement } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";

// Components
import TopBar from "../Header/TopBar";
import List from "../../components/List/List";
import InputContainer from "../../components/Input/InputContainer";
import Dropdown from "../Dropdown/Dropdown";

// Constants
import constantData, { types } from "../../constants/listsData";

// Utils
import StoreApi from "../../utils/context";
import { validate } from "../../utils/helpers";

// Actions
import { getLocalUsers } from "../../store/users/actions";

// Stylesheet
import { useStyle } from "./styles";
import { routes } from "../../constants/routes";

// Types
import {
  DropdownType,
  PerferencesType,
  CardType,
} from "../../constants/types";

const styles = {
  container: (css: any) => ({ ...css, width: "200px" }),
};

export default function Board(): ReactElement {
  const localData = localStorage.getItem("user");
  let preferencesData: PerferencesType = { color: "", boardTitle: "" };
  let persistedData: any = localStorage.getItem("data");

  if (localData) preferencesData = JSON.parse(localData);
  if (persistedData) persistedData = JSON.parse(persistedData);
  else persistedData = constantData;

  const dispatch = useDispatch();
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState<types>(persistedData);
  const [filteredData, setfilteredData] = useState<types>(persistedData);
  const [dropdownValue, setDropdownValue] = useState<DropdownType>();
  const [currentlyDragged, setCurrentlyDragged] = useState("");
  const [moving, setMoving] = useState(false);
  const preferences: PerferencesType = preferencesData;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getLocalUsers());
    };
    fetchData();
  }, []);
  useEffect(() => {
    let search: string | string[] = location.search;
    setfilteredData(persistedData);

    if (search === "") {
      setDropdownValue({ label: "All", value: "All" });
      return;
    }

    search = decodeURIComponent(search);
    search = search.split("=");
    search = search[1].split("-").join(" ");

    setDropdownValue({ label: search, value: search });
    if (search === "All") {
      return;
    }
    const filtered = JSON.parse(JSON.stringify(data));
    for (const key in data.lists) {
      filtered.lists[key].cards = [];
      data.lists[key].cards.map((card: CardType) => {
        if (card.user === search) {
          filtered.lists[key].cards.push(card);
        }
      });
    }
    setfilteredData(filtered);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addMoreCard = (
    title: string,
    listId: string,
    user: string,
    storypoints: number
  ) => {
    const newCardId: string = uuid();
    const newCard: CardType = {
      id: newCardId,
      title,
      user: user,
      restricted: [],
      storypoints: storypoints,
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
    setfilteredData(newState);
  };

  const editOrRemoveCard = (card: CardType, type: string) => {
    const temp = { ...data };
    for (const currentList in data.lists) {
      for (const listItem in data.lists[currentList]) {
        const cardIndex = data.lists[currentList].cards.findIndex(
          (itemx: { id: string }) => itemx.id === card.id
        );
        if (type === "edit") temp.lists[currentList].cards[cardIndex] = card;
        else if (cardIndex > -1)
          temp.lists[currentList].cards.splice(cardIndex, 1);
      }
    }
    setData(temp);
    setfilteredData(temp);
  };

  const addMoreList = (title: string) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
      user: {},
      restricted: [],
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

  const onDragEnd = (result: DropResult): undefined | void => {
    setCurrentlyDragged("");

    const { destination, source, draggableId, type } = result;
    if (!validate(source.droppableId, destination?.droppableId, data)) return;
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
      (card: { id: string }) => card.id === draggableId
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
  const onDragStart = (result: { source: { droppableId: string } }) => {
    setCurrentlyDragged(result.source.droppableId);
    setMoving(!moving);
  };

  const handleChangeDropdown = (selected: { [key: string]: string }) => {
    const queryParam = encodeURIComponent(selected.value.split(" ").join("-"));

    history.push({
      pathname: routes.board,
      search: `?assignee=${queryParam}`,
    });
  };
  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, editOrRemoveCard }}>
      <div
        className={classes.root}
        style={{ backgroundColor: preferences.color }}
      >
        <TopBar title={preferences.boardTitle} />
        <Dropdown
          styles={styles}
          handleChangeDropdown={handleChangeDropdown}
          placeholder={"All Users"}
          value={dropdownValue}
          withAll
        />
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div
                className={`${classes.listContainer} ${classes.my}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredData.listIds.map((listId, index) => {
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

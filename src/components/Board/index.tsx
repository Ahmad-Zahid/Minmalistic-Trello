// Packages
import { useState, useEffect, ReactElement } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Typography } from "@material-ui/core";

// Components
import TopBar from "../Header/TopBar";
import Dropdown from "../Dropdown/Dropdown";
import DropabbleBody from "./Body";

// Constants
import constantData, { types } from "../../constants/listsData";
import { storypoints } from "../../constants/slider";
import { routes } from "../../constants/routes";

// Utils
import StoreApi from "../../utils/context";
import { addCard, addList, searchCard, validate } from "../../utils/helpers";

// Actions
import { getLocalUsers } from "../../store/users/actions";

// Stylesheet
import { useStyle, styles } from "./styles";

// Types
import { DropdownType, PerferencesType, CardType } from "../../constants/types";

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
  const { search: searchParam } = useLocation();
  const storyPoints = [...storypoints];
  const preferences: PerferencesType = preferencesData;
  const queryParams = new URLSearchParams(searchParam);

  const [data, setData] = useState<types>(persistedData);
  const [filteredData, setfilteredData] = useState<types>(persistedData);
  const [dropdownValue, setDropdownValue] = useState<DropdownType>();
  const [spDropdownValue, setspDropdownValue] = useState<DropdownType>();
  const [currentlyDragged, setCurrentlyDragged] = useState<string>("");
  const [moving, setMoving] = useState<boolean>(false);

  if (storyPoints[0].value !== "All")
    storyPoints.unshift({
      value: "All",
      label: "All Storypoints",
    });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getLocalUsers());
    };
    fetchData();
  }, []);

  useEffect(() => {
    setfilteredData(persistedData);
    const searchParams = new URLSearchParams(searchParam);
    let assignee = searchParams.get("assignee");
    const storypoints = searchParams.get("storypoints");
    if (assignee) assignee = decodeURIComponent(assignee.split("-").join(" "));

    setspDropdownValue({
      label: storypoints ? storypoints : "All storypoints",
      value: storypoints ? storypoints : "All",
    });

    setDropdownValue({
      label: assignee ? assignee : "All Users",
      value: assignee ? assignee : "All",
    });
    if (assignee || storypoints) searchCards(assignee, storypoints);
  }, [searchParam]);

  const searchCards = (assginee: string | null, storypoints: string | null) => {
    const filtered = searchCard(assginee, storypoints, data);
    setfilteredData(filtered);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addMoreCard = (
    title: string,
    listId: string,
    user: string,
    storypoints: number
  ) => {
    const newState = addCard(data, title, listId, user, storypoints);
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
    const newState = addList(title, data);
    setData(newState);
    setfilteredData(newState);
  };

  const onDragEnd = (result: DropResult): undefined | void => {
    setCurrentlyDragged("");

    const { destination, source, draggableId, type } = result;
    if (!validate(source.droppableId, destination?.droppableId, data)) return;
    if (!destination) return;

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
      setfilteredData(newSate);
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
      setfilteredData(newState);
    }
  };

  const onDragStart = (result: { source: { droppableId: string } }) => {
    setCurrentlyDragged(result.source.droppableId);
    setMoving(!moving);
  };

  const handleChangeDropdown = (
    selected: { [key: string]: string },
    type: string
  ) => {
    const { value } = selected;
    let query = "";

    if (query) query = encodeURIComponent(value.split(" ").join("-"));
    else query = encodeURIComponent(value);

    if (value === "All") queryParams.delete(type);
    else queryParams.set(type, query);

    history.push({
      pathname: routes.board,
      search: queryParams.toString(),
    });
  };

  const Filters = () => {
    return (
      <div className={classes.row}>
        <Typography className={classes.filterTitle}>Filters</Typography>
        <Dropdown
          styles={styles}
          handleChangeDropdown={(selected) =>
            handleChangeDropdown(selected, "assignee")
          }
          placeholder={"All Users"}
          value={dropdownValue}
          withAll
        />
        <Dropdown
          styles={styles}
          handleChangeDropdown={(selected) =>
            handleChangeDropdown(selected, "storypoints")
          }
          placeholder={"All Storypoints"}
          value={spDropdownValue}
          options={storyPoints}
        />
      </div>
    );
  };

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, editOrRemoveCard }}>
      <div
        className={classes.root}
        style={{ backgroundColor: preferences.color }}
      >
        <TopBar title={preferences.boardTitle} />
        <Filters />
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <DropabbleBody
            filteredData={filteredData}
            currentlyDragged={currentlyDragged}
            moving={moving}
          />
        </DragDropContext>
      </div>
    </StoreApi.Provider>
  );
}

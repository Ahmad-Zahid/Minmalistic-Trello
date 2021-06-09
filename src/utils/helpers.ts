// Packages
import { v4 as uuid } from "uuid";

// Types
import { types } from "../constants/listsData";
import { CardType } from "../constants/types";

export const validate = (source: string, destination: any, data: any): boolean => {
    if (data.lists[source].restricted.includes(destination)) return false;
    return true;
};

export const addCard = (
    data: types,
    title: string,
    listId: string,
    user: string,
    storypoints: number
): types => {
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
    return newState

}

export const addList = (title: string, data: types): types => {
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
    return newState
}

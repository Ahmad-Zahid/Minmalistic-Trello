export interface types {
  lists: {
    [key: string]: {
      id: string,
      title: string,
      cards: Array<any>,
      restricted: Array<string>
    }
  },
  listIds: Array<string>

}
const data: types = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'TO DO',
      cards: [],
      restricted: ['list-3', 'list-4', 'list-5', 'list-6', 'list-7']
    },
    'list-2': {
      id: 'list-2',
      title: 'IN PROGRESS',
      cards: [],
      restricted: ['list-5', 'list-6', 'list-7']


    },
    'list-3': {
      id: 'list-3',
      title: 'BLOCKED',
      cards: [],
      restricted: ['list-6', 'list-7']


    },
    'list-4': {
      id: 'list-4',
      title: 'IN CODE REVIEW',
      cards: [],
      restricted: ['list-3', 'list-6', 'list-7']

    },
    'list-5': {
      id: 'list-5',
      title: 'READY FOR QA',
      cards: [],
      restricted: ['list-3', 'list-6', 'list-7']

    },
    'list-6': {
      id: 'list-6',
      title: 'IN QA',
      cards: [],
      restricted: ['list-2', 'list-4', 'list-5']

    },
    'list-7': {
      id: 'list-7',
      title: 'DONE',
      cards: [],
      restricted: ['list-1', 'list-2', 'list-3', 'list-4', 'list-5', 'list-6', 'list-7']

    },
  },
  listIds: ['list-1', 'list-2', 'list-3', 'list-4', 'list-5', 'list-6', 'list-7',],
};

export default data;

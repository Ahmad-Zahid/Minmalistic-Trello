export interface UserType {
  name: {
    first: string;
    last: string;
  };
}
export interface DropdownType {
  label: string,
  value: string
}

export interface PerferencesType {
  color: string,
  boardTitle: string,
  title?:string
}

export interface CardType {
  id: string,
  restricted: Array<string>,
  storypoints: number,
  title: string,
  user: string
}

export interface ObjectType{
  [key: string]:string
}

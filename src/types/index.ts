export interface IStory {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
  comments?: IComment[],
}

export interface IComment {
  by: string,
  id: number,
  kids: number[],
  parent: number,
  text: string,
  time: number,
  type: string
}

export interface IPage {
  number: number,
  start: number,
  end: number,
}

export interface INotification {
  isShow: boolean;
  type: string;
  subtitle: string;
}
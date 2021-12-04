export interface IObject {
  [key: string]: string | number | boolean | unknown;
}

export interface IMessage {
  _id: string;
  email: string;
  text: string;
  date: string;
}

export type Operators =
  | "<"
  | "<="
  | "=="
  | ">"
  | ">="
  | "!="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";

export type List = {
  id?: string;
  name: string;
  createdAt: number;
  allowedUsers: (string | undefined)[];
};

export type ObjectOfLists = {
  [key: string]: List;
};

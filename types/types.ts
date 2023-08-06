import { FootballPositionsAbbreviations, LeadFoot } from "@/types/enums";

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
  authorId?: string;
  name: string;
  createdAt: Date;
  allowedUsers: (string | undefined)[];
};

export type ObjectOfLists = {
  [key: string]: List;
};

export type PlayerObj = {
  id?: string;
  authorId?: string;
  createdAt: Date;
  inLists: string[];
  data: PlayerData;
};

export type PlayerData = {
  firstName?: string;
  lastName?: string;
  age?: number;
  position?: FootballPositionsAbbreviations;
  nationality?: string;
  club?: string;
  weight?: number;
  height?: number;
  leadFoot?: LeadFoot;
  seenAt?: string;
  note?: string;
};

export type sortDirections = "ASC" | "DESC";

import { FootballPositions, LeadFoot } from "@/types/enums";

export const utilsFootballPositionsArray = Object.entries(
  FootballPositions
).map(([key, value]) => ({
  title: `${key} - ${value}`,
  value: key,
}));

export const utilsLeadFootArray = Object.entries(LeadFoot).map(
  ([key, value]) => ({
    title: value,
    value: key,
  })
);

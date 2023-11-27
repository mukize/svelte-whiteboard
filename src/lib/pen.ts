import { writable } from "svelte/store";
import { pencilIcon, pencilIdent } from "./shapes/pencil";
import { lineIcon, lineIdent } from "./shapes/line";

export type PenMode = typeof pencilIdent | typeof lineIdent;
export type Pen = {
  mode: PenMode;
};
type PenPallete = {
  mode: PenMode;
  iconName: string;
};

export const penPalletes: PenPallete[] = [
  {
    mode: pencilIdent,
    iconName: pencilIcon,
  },
  {
    mode: lineIdent,
    iconName: lineIcon,
  },
];


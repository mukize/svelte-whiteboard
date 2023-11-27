import type { pencilIdent } from "./shapes/pencil";

export type PenMode = typeof pencilIdent;
export type Pen = {
  mode: PenMode;
};

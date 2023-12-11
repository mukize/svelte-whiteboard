import Konva from "konva";
import type { WhiteboardMode } from "$lib/types";

export const rectMode: WhiteboardMode<Konva.Rect> = {
  type: "shape",
  icon: "mingcute:square-fill",
  construct(id, pos) {
    return {
      shape: new Konva.Rect({
        id,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        stroke: "#cfc9c2",
        strokeWidth: 5,
      }),
      draw(pos) {
        this.shape.width(pos.x - this.shape.x());
        this.shape.height(pos.y - this.shape.y());
      },
    };
  },
};

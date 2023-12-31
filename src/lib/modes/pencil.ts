import Konva from "konva";
import type { WhiteboardMode } from "$lib/types";

export const pencilMode: WhiteboardMode<Konva.Line> = {
  type: "shape",
  icon: "mingcute:pencil-fill",
  construct(id, pos) {
    return {
      shape: new Konva.Line({
        id,
        points: [pos.x, pos.y],
        stroke: "#cfc9c2",
        strokeWidth: 5,
        hitStrokeWidth: 10,
        lineCap: "round",
        tension: 0.2,
      }),
      draw(pos) {
        this.shape.points(this.shape.points().concat([pos.x, pos.y]));
      },
    };
  },
};

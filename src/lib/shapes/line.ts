import Konva from "konva";
import type { WhiteboardShapeMode } from "$lib/util/shape";

export const lineMode: WhiteboardShapeMode<Konva.Line> = {
  ident: "line",
  icon: "mingcute:minimize-line",
  construct(id, pos) {
    return {
      shape: new Konva.Line({
        id,
        points: [pos.x, pos.y],
        stroke: "#cfc9c2",
        strokeWidth: 5,
        lineCap: "round",
        tension: 0.2,
      }),
      draw(pos) {
        this.shape.points([
          this.shape.points()[0],
          this.shape.points()[1],
          pos.x,
          pos.y,
        ]);
      },
    };
  },
};
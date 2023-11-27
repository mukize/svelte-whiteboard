import Konva from "konva";
import type { WhiteboardShapeConstructor } from "$lib/shape";

export const pencilIdent = "pencil";
export const newPencil: WhiteboardShapeConstructor<Konva.Line> = function (
  id,
  pos
) {
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
      this.shape.points(this.shape.points().concat([pos.x, pos.y]));
    },
  };
};

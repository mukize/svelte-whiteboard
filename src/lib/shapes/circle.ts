import Konva from "konva";
import type { WhiteboardShapeMode } from "$lib/util/shape";

export const circleMode: WhiteboardShapeMode<Konva.Ellipse> = {
  ident: "circle",
  icon: "mingcute:round-fill",
  construct(id, pos) {
    return {
      shape: new Konva.Ellipse({
        id,
        x: pos.x,
        y: pos.y,
        radiusX: 0,
        radiusY: 0,
        stroke: "#cfc9c2",
        strokeWidth: 5,
        lineCap: "round",
        tension: 0.2,
      }),
      draw(pos) {
        this.shape.radiusX(Math.abs(pos.x - this.shape.x()));
        this.shape.radiusY(Math.abs(pos.y - this.shape.y()));
      },
    };
  },
};
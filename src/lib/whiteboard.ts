import { nanoid } from "nanoid";
import type { WhiteboardShape } from "./shape";
import type { Pen, PenMode } from "./pen";
import type Konva from "konva";
import { newPencil, pencilIdent } from "./shapes/pencil";
import type { Vector2d } from "konva/lib/types";

function WhiteboardShapeFactory(mode: PenMode, id: string, mousePos: Vector2d) {
  switch (mode) {
    case pencilIdent:
      return newPencil(id, mousePos);
    default:
      throw "Pen mode not supported";
  }
}

export class Whiteboard {
  drawing: boolean = false;
  recentShape: WhiteboardShape | undefined;

  handleMouseDown(stage: Konva.Stage, layer: Konva.Layer, pen: Pen) {
    const mousePos = stage.getPointerPosition();
    if (!mousePos) return;
    this.recentShape = WhiteboardShapeFactory(pen.mode, nanoid(3), mousePos);
    layer.add(this.recentShape.shape);
    this.drawing = true;
  }

  handleMouseMove(stage: Konva.Stage) {
    if (!this.drawing) return;
    const mousePos = stage.getPointerPosition();
    if (!mousePos) return;
    this.recentShape?.draw(mousePos);
  }

  handleMouseUp() {
    this.drawing = false;
  }
}

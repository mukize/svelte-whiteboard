import { nanoid } from "nanoid";
import type { WhiteboardShape } from "./shape";
import type { PenMode } from "./pen";
import type Konva from "konva";
import { newPencil, pencilIdent } from "./shapes/pencil";
import type { Vector2d } from "konva/lib/types";
import { lineIdent, newLine } from "./shapes/line";

function whiteboardShapeFactory(mode: PenMode, id: string, mousePos: Vector2d) {
  console.log(mode);
  switch (mode) {
    case pencilIdent:
      return newPencil(id, mousePos);
    case lineIdent:
      return newLine(id, mousePos);
    default:
      throw "Pen mode not supported";
  }
}

export class Whiteboard {
  drawing: boolean = false;
  recentShape: WhiteboardShape | undefined;

  handleMouseDown(
    stage: Konva.Stage,
    layer: Konva.Layer,
    currentPenMode: PenMode
  ) {
    const mousePos = stage.getPointerPosition();
    if (!mousePos) return;
    this.recentShape = whiteboardShapeFactory(
      currentPenMode,
      nanoid(3),
      mousePos
    );
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

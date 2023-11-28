import { nanoid } from "nanoid";
import type { WhiteboardShape, WhiteboardShapeMode } from "./util/shape";
import type Konva from "konva";
import { pencilMode } from "./shapes/pencil";
import { lineMode } from "./shapes/line";
import { rectMode } from "./shapes/rect";
import { circleMode } from "./shapes/circle";

export type WhiteboardModes = Map<string, WhiteboardShapeMode<any>>;

export class Whiteboard {
  drawing: boolean = false;
  defaultMode: string = pencilMode.ident;
  modes: WhiteboardModes = mapModes(pencilMode, lineMode, rectMode, circleMode);
  recentShape: WhiteboardShape | undefined;

  handleMouseDown(
    stage: Konva.Stage,
    layer: Konva.Layer,
    currentPenMode: string
  ) {
    const mousePos = stage.getPointerPosition();
    if (!mousePos) {
      return;
    }

    const currentMode = this.modes.get(currentPenMode);
    if (!currentMode) {
      throw `mode "${currentPenMode}" is not supported.`;
    }

    this.recentShape = currentMode.construct(nanoid(3), mousePos);
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

function mapModes(...modes: WhiteboardShapeMode<any>[]) {
  let modeMap: WhiteboardModes = new Map();
  modes.forEach((mode) => modeMap.set(mode.ident, mode));
  return modeMap;
}
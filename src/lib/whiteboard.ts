import { nanoid } from "nanoid";
import type { WhiteboardShape } from "./types";
import Konva from "konva";
import { pencilMode } from "./modes/pencil";
import { lineMode } from "./modes/line";
import { rectMode } from "./modes/rect";
import { circleMode } from "./modes/circle";
import type { Writable } from "svelte/store";
import type { Vector2d } from "konva/lib/types";
import { addToBin, clearBin, eraserMode } from "./modes/eraser";
import {
  pointerClick,
  pointerMode,
  select,
  selectIntersection,
} from "./modes/pointer";
import { moveMode } from "./modes/move";

export const whiteboardModes = {
  move: moveMode,
  pointer: pointerMode,
  pencil: pencilMode,
  line: lineMode,
  rect: rectMode,
  circle: circleMode,
  eraser: eraserMode,
};

export type ModeIdents = keyof typeof whiteboardModes;
export const defaultMode: ModeIdents = "pointer";

export class Whiteboard {
  stage: Konva.Stage;
  layer: Konva.Layer;
  transformer: Konva.Transformer;

  drawing = false;
  bin = new Map<string, Konva.Shape>();
  recentShape: WhiteboardShape | undefined;
  select = select;

  modes = whiteboardModes;
  currentMode = defaultMode;

  constructor(
    stage: Konva.Stage,
    layer: Konva.Layer,
    transformer: Konva.Transformer,
    currentModeStore: Writable<ModeIdents>
  ) {
    this.stage = stage;
    console.log(this.stage.position());
    this.layer = layer;
    this.transformer = transformer;
    this.layer.add(this.select.shape);
    currentModeStore.subscribe((v) => {
      this.currentMode = v;
      this.stage.draggable(v === "move");
      transformer.nodes([]);
    });
  }

  handleMouseDown(e: Konva.KonvaPointerEvent) {
    let startDrawing = true;
    switch (this.currentMode) {
      case "eraser":
        break;
      case "pointer":
        startDrawing = pointerClick(
          this.select.shape,
          e,
          this.stage,
          this.transformer
        );
        break;
      case "move":
        startDrawing = false;
        break;
      default:
        this.recentShape = this.modes[this.currentMode].construct(nanoid(3), {
          x: (this.stage.getPointerPosition()?.x ?? 0) - this.stage.x(),
          y: (this.stage.getPointerPosition()?.y ?? 0) - this.stage.y(),
        });
        this.recentShape.shape.name("shape");
        this.layer.add(this.recentShape.shape);
    }
    if (startDrawing) this.drawing = true;
  }

  handleMouseMove(e: Konva.KonvaPointerEvent) {
    if (!this.drawing) return;
    switch (this.currentMode) {
      case "pointer":
        this.select.draw({
          x: this.stage.x() + (this.stage.getPointerPosition()?.x ?? 0),
          y: this.stage.y() + (this.stage.getPointerPosition()?.y ?? 0),
        });
        break;
      case "eraser":
        if (e.target instanceof Konva.Shape) addToBin(this.bin, e.target);
        break;
      default:
        this.recentShape?.draw({
          x: (this.stage.getPointerPosition()?.x ?? 0) - this.stage.x(),
          y: (this.stage.getPointerPosition()?.y ?? 0) - this.stage.y(),
        });
    }
  }

  handleMouseUp() {
    switch (this.currentMode) {
      case "pointer":
        if (this.drawing)
          selectIntersection(this.select.shape, this.stage, this.transformer);
        break;
      case "eraser":
        clearBin(this.bin);
        break;
      default:
    }
    this.drawing = false;
  }
}

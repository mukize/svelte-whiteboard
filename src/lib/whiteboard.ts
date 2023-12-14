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

export const whiteboardModes = {
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
    this.layer = layer;
    this.transformer = transformer;
    this.layer.add(this.select.shape);
    currentModeStore.subscribe((v) => {
      this.currentMode = v;
      transformer.nodes([]);
    });
  }

  handleMouseDown(e: Konva.KonvaPointerEvent) {
    const startDrawing = true;
    switch (this.currentMode) {
      case "eraser":
        break;
      case "pointer":
        pointerClick(this.select.shape, e, this.stage, this.transformer);
        break;
      default:
        this.recentShape = this.modes[this.currentMode].construct(
          nanoid(3),
          this.stage.getPointerPosition() as Vector2d
        );
        this.recentShape.shape.name("shape");
        this.layer.add(this.recentShape.shape);
    }
    if (startDrawing) {
      this.drawing = true;
    }
  }

  handleMouseMove(e: Konva.KonvaPointerEvent) {
    if (!this.drawing) return;
    switch (this.currentMode) {
      case "pointer":
        this.select.draw(this.stage.getPointerPosition() as Vector2d);
        break;
      case "eraser":
        if (e.target instanceof Konva.Shape) addToBin(this.bin, e.target);
        break;
      default:
        this.recentShape?.draw(this.stage.getPointerPosition() as Vector2d);
    }
  }

  handleMouseUp() {
    this.drawing = false;
    switch (this.currentMode) {
      case "pointer":
        selectIntersection(this.select.shape, this.stage, this.transformer);
      case "eraser":
        clearBin(this.bin);
      default:
    }
  }
}

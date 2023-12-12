import { nanoid } from "nanoid";
import type { WhiteboardCtx, WhiteboardShape } from "./types";
import Konva from "konva";
import { pencilMode } from "./modes/pencil";
import { lineMode } from "./modes/line";
import { rectMode } from "./modes/rect";
import { circleMode } from "./modes/circle";
import type { Writable } from "svelte/store";
import type { Vector2d } from "konva/lib/types";
import { eraserMode } from "./modes/eraser";
import { pointerMode } from "./modes/pointer";

export const whiteboardModes = {
  pointer: pointerMode,
  pencil: pencilMode,
  line: lineMode,
  rect: rectMode,
  circle: circleMode,
  eraser: eraserMode,
};

export type ModeIdents = keyof typeof whiteboardModes;
let defaultMode: ModeIdents = "pencil";

export class Whiteboard {
  stage: Konva.Stage;
  layer: Konva.Layer;
  transformer: Konva.Transformer;

  drawing = false;
  bin = new Map<string, Konva.Shape>();
  recentShape: WhiteboardShape | undefined;

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
    currentModeStore.subscribe((v) => (this.currentMode = v));
  }

  handleMouseDown(e: Konva.KonvaPointerEvent) {
    const mode = this.modes[this.currentMode];
    if (mode.type == "shape") {
      this.recentShape = mode.construct(
        nanoid(3),
        this.stage.getPointerPosition() as Vector2d
      );
      this.layer.add(this.recentShape.shape);
    } else if (
      this.currentMode == "pointer" &&
      e.target instanceof Konva.Shape &&
      !(e.target.getParent()?.className == "Transformer")
    ) {
      this.transformer.nodes([e.target]);
      return;
    }
    this.drawing = true;
  }

  handleMouseMove(e: Konva.KonvaPointerEvent) {
    if (!this.drawing) return;
    if (this.modes[this.currentMode].type == "shape") {
      this.recentShape?.draw(this.stage.getPointerPosition() as Vector2d);
    } else if (
      this.currentMode === "eraser" &&
      e.target instanceof Konva.Shape
    ) {
      e.target.listening(false);
      this.bin.set(e.target.id(), e.target);
      console.log("Set");
      e.target.opacity(0.5);
    }
  }

  handleMouseUp() {
    this.drawing = false;
    if (this.currentMode === "eraser") {
      this.bin.forEach((s) => s.destroy());
      this.bin = new Map();
    }
  }
}

import type Konva from "konva";
import type { Vector2d } from "konva/lib/types";

export type WhiteboardCtx = {
  stage: Konva.Stage;
  layer: Konva.Layer;
  transformer: Konva.Transformer;
};

export type WhiteboardShape<T = Konva.Shape> = {
  shape: T;
  draw(pos: Vector2d): void;
};

export type WhiteboardMode<T = undefined> = {
  icon: string;
} & (T extends Konva.Node ? WhiteboardShapeMode<T> : WhiteboardToolMode);

type WhiteboardShapeMode<T extends Konva.Node> = {
  type: "shape";
  construct: WhiteboardShapeConstructor<T>;
};

type WhiteboardToolMode = {
  type: "tool";
};

type WhiteboardShapeConstructor<T extends Konva.Node> = (
  id: string,
  mousePos: Vector2d
) => WhiteboardShape<T>;

import type Konva from "konva";
import type { Vector2d } from "konva/lib/types";

export interface WhiteboardShape<T = Konva.Shape> {
  shape: T;
  draw(pos: Vector2d): void;
}

export type WhiteboardShapeConstructor<T> = (
  id: string,
  mousePos: Vector2d
) => WhiteboardShape<T>;

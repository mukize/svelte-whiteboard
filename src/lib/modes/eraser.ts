import type { WhiteboardMode } from "$lib/types";
import type Konva from "konva";

export const eraserMode: WhiteboardMode = {
  type: "tool",
  icon: "mingcute:eraser-fill",
};

export function addToBin(bin: Map<string, Konva.Shape>, shape: Konva.Shape) {
  shape.listening(false);
  bin.set(shape.id(), shape);
  shape.opacity(0.5);
}

export function clearBin(bin: Map<string, Konva.Shape>) {
  bin.forEach((s) => s.destroy());
  bin.clear();
}
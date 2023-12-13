import type { WhiteboardMode } from "$lib/types";
import Konva from "konva";
import { rectMode } from "./rect";

export const pointerMode: WhiteboardMode = {
  type: "tool",
  icon: "mingcute:cursor-fill",
};

let _select = rectMode.construct("pointerSelector", { x: 0, y: 0 });
_select.shape.fill("rgba(123, 68, 240, 0.33)");
_select.shape.listening(false);
_select.shape.strokeWidth(0);

export const select = _select;

export function pointerClick(
  node: Konva.KonvaPointerEvent["target"],
  transformer: Konva.Transformer
) {
  if (node instanceof Konva.Stage) {
    transformer.nodes([]);
  } else if (
    node instanceof Konva.Shape &&
    !(node.getParent()?.className == "Transformer")
  ) {
    transformer.nodes([node]);
    return;
  }
}

export function selectIntersection(
  rect: Konva.Rect,
  stage: Konva.Stage,
  transformer: Konva.Transformer
) {
  let selected: Konva.Node[] = [];
  stage.find(".shape").forEach((shape) => {
    if (
      Konva.Util.haveIntersection(rect.getClientRect(), shape.getClientRect())
    ) {
      selected.push(shape);
    }
  });
  transformer.nodes(selected);
}
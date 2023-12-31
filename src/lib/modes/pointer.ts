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
  selectRect: Konva.Rect,
  event: Konva.KonvaPointerEvent,
  stage: Konva.Stage,
  transformer: Konva.Transformer
) {
  const node = event.target;
  if (node instanceof Konva.Stage) {
    if (event.evt.shiftKey) return false;
    selectRect.position(stage.getPointerPosition() as Konva.Vector2d);
    selectRect.visible(true);
    transformer.nodes().forEach((n) => {
      n.draggable(false);
    });
    transformer.nodes([]);
  } else if (node instanceof Konva.Shape) {
    if (!transformer.nodes().includes(node)) {
      if (node.getParent()?.className === "Transformer") return false;
      node.draggable(true);
      if (event.evt.shiftKey) {
        transformer.nodes([...transformer.nodes(), node]);
      } else {
        transformer.nodes([node]);
      }
    } else if (event.evt.shiftKey) {
      transformer.nodes(transformer.nodes().filter((n) => n !== node));
    }
    return false;
  }
  return true;
}

export function selectIntersection(
  rect: Konva.Rect,
  stage: Konva.Stage,
  transformer: Konva.Transformer
) {
  let selected: Konva.Node[] = [];
  transformer.nodes(
    stage.find(".shape").filter((shape) => {
      if (
        Konva.Util.haveIntersection(rect.getClientRect(), shape.getClientRect())
      ) {
        shape.draggable(true);
        return true;
      }
    })
  );
  rect.visible(false);
  rect.width(0);
  rect.height(0);
}
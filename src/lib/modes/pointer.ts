import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import type { Vector2d } from "konva/lib/types";

const pointerMode = {
  ident: "pointer",
  icon: "mingcute:cursor-fill",
  shape: new Konva.Rect({
    id: "pointerRect",
    fill: "rgba(0,0,255,0.5)",
    visible: false,
  }),
  mouseDown(pos: Vector2d) {
    this.shape.visible(true);
    this.shape.x(pos.x);
    this.shape.y(pos.y);
  },
  mouseMove(pos: Vector2d) {
    this.shape.width(pos.x - this.shape.x());
    this.shape.height(pos.y - this.shape.y());
  },
  mouseUp(layer: Layer, transformer: Konva.Transformer) {
    const selectedNodes = layer.find((node: Konva.Node) => {
      return Konva.Util.haveIntersection(
        this.shape.getClientRect(),
        node.getClientRect()
      );
    });
    transformer.nodes(selectedNodes);
    this.shape.visible(false);
  },
};

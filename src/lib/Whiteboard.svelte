<script lang="ts">
  import { Layer, Line, Stage } from "svelte-konva";
  import { writable } from "svelte/store";
  import { onMount, tick } from "svelte";
  import Konva from "konva";
  import type { Pen } from "./pen";
  import { Whiteboard } from "./whiteboard";

  const windowHeight = writable(0);
  const windowWidth = writable(0);
  const pen = writable<Pen>({
    mode: "pencil",
  });
  const whiteboard = new Whiteboard();

  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let line = new Konva.Line({
    points: [0, 0],
    stroke: "white",
    strokeWidth: 20,
  });

  onMount(() => {
    windowHeight.set(window.innerHeight);
    windowWidth.set(window.innerWidth);
    window.addEventListener("resize", () => {
      windowHeight.set(window.innerHeight);
      windowWidth.set(window.innerWidth);
    });
    tick().then(() => {
      layer.add(line);
    });
  });
  function mouseDown() {
    if (stage) whiteboard.handleMouseDown(stage, layer, $pen);
  }
  function mouseMove() {
    if (stage) whiteboard.handleMouseMove(stage);
  }
  function mouseUp() {
    whiteboard.handleMouseUp();
    console.log(whiteboard.recentShape);
  }
</script>

<Stage
  config={{ height: $windowHeight, width: $windowWidth }}
  on:pointerdown={mouseDown}
  on:pointermove={mouseMove}
  on:pointerup={mouseUp}
  bind:handle={stage}
>
  <Layer bind:handle={layer} />
</Stage>

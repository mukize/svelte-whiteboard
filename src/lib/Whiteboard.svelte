<script lang="ts">
  import { Layer, Stage } from "svelte-konva";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import type Konva from "konva";
  import { Whiteboard } from "./whiteboard";
  import Pallete from "./Pallete.svelte";
  import { pencilMode } from "./shapes/pencil";

  const windowHeight = writable(0);
  const windowWidth = writable(0);
  const whiteboard = new Whiteboard();
  const currentPenMode = writable(whiteboard.defaultMode);
  let stage: Konva.Stage;
  let layer: Konva.Layer;

  onMount(() => {
    windowHeight.set(window.innerHeight);
    windowWidth.set(window.innerWidth);
    window.addEventListener("resize", () => {
      windowHeight.set(window.innerHeight);
      windowWidth.set(window.innerWidth);
    });
  });
  function mouseDown() {
    if (stage) whiteboard.handleMouseDown(stage, layer, $currentPenMode);
  }
  function mouseMove() {
    if (stage) whiteboard.handleMouseMove(stage);
  }
  function mouseUp() {
    whiteboard.handleMouseUp();
  }
</script>

<Pallete {currentPenMode} modes={whiteboard.modes} />
<Stage
  config={{ height: $windowHeight, width: $windowWidth }}
  on:pointerdown={mouseDown}
  on:pointermove={mouseMove}
  on:pointerup={mouseUp}
  bind:handle={stage}
>
  <Layer bind:handle={layer} />
</Stage>

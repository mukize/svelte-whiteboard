<script lang="ts">
  import { writable } from "svelte/store";
  import Konva from "konva";
  import { Whiteboard, type ModeIdents } from "./whiteboard";
  import Pallete from "./Pallete.svelte";
  import { onMount } from "svelte";

  let whiteboard: Whiteboard;
  const currentMode = writable<ModeIdents>("pencil");
  onMount(() => {
    const stage = new Konva.Stage({
      container: "whiteboard-canvas",
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener("resize", () => {
      stage.width(window.innerWidth);
      stage.height(window.innerHeight);
    });

    const layer = new Konva.Layer();
    const transformer = new Konva.Transformer();

    stage.add(layer);
    layer.add(transformer);
    whiteboard = new Whiteboard(stage, layer, transformer, currentMode);
    stage.on("pointerdown", (e) => whiteboard.handleMouseDown());
    stage.on("pointermove", (e) => whiteboard.handleMouseMove(e));
    stage.on("pointerup", (e) => whiteboard.handleMouseUp());
  });
  
</script>

<Pallete {currentMode} />
<div id="whiteboard-canvas"></div>
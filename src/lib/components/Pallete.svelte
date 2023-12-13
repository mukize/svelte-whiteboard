<script lang="ts">
  import type { Writable } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { whiteboardModes } from "../whiteboard";

  export let currentMode: Writable<string>;

</script>

<section
  class="z-10 fixed flex justify-around -translate-x-1/2 left-1/2 
    bg-tokyo-comment top-[5%] rounded-md px-5 py-3 w-1/2"
>
{#each Object.entries(whiteboardModes) as [ident, mode]}
  {@const isCurrentPen = $currentMode === ident}
  <button
      disabled={isCurrentPen}
      on:click={() => currentMode.set(ident)}
  >
    <Icon
      icon={mode.icon}
      class="
        text-4xl transition-colors duration-150  
        {isCurrentPen ? "text-tokyo-green" : "text-tokyo-white hover:text-tokyo-magenta"}
      "
    />
  </button>
{/each}

</section>
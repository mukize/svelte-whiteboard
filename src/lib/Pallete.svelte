<script lang="ts">
  import type { Writable } from "svelte/store";
  import Icon from "@iconify/svelte";
  import type { WhiteboardModes } from "./whiteboard";

  export let currentPenMode: Writable<string>;
  export let modes: WhiteboardModes;

</script>

<section 
  class="z-10 fixed flex justify-around -translate-x-1/2 left-1/2 
    bg-tokyo-comment top-[5%] rounded-md px-5 py-3 w-1/2"
>
{#each modes as [ident, mode]}
  {@const isCurrentPen = $currentPenMode === ident}
  <button
      disabled={isCurrentPen}
      on:click={() => currentPenMode.set(ident)}
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
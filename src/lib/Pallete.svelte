<script lang="ts">
  import type { Writable } from "svelte/store";
  import { type PenMode, penPalletes } from "./pen";
  import Icon from "@iconify/svelte";

  export let currentPenMode: Writable<PenMode>;

</script>

<section 
  class="z-10 fixed flex justify-around -translate-x-1/2 left-1/2 bg-tokyo-comment top-[5%] rounded-md px-5 py-3 w-1/2"
>
{#each penPalletes as pallete}
  {@const isCurrentPen = $currentPenMode === pallete.mode}
  <button
      disabled={isCurrentPen}
      on:click={() => currentPenMode.set(pallete.mode) }
  >
    <Icon
      icon={pallete.iconName}
      class="
        text-4xl transition-colors duration-150  
        {isCurrentPen ? "text-tokyo-green" : "text-tokyo-white hover:text-tokyo-magenta"}
      "
    />
  </button>
{/each}

</section>
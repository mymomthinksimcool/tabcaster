<script>
  import { onMount, onDestroy } from 'svelte'
  import { fade } from 'svelte/transition'
  import { tab, initTabCaster, interacted, visible, tabChannel, active, activeID } from '$lib/services/tab.service.js'

  let ready = false

  onMount(async () => {
    await initTabCaster(true)
    ready = true
  })

  onDestroy(async () => {
    // tabChannel.close()
  })
</script>

{#if ready}
  <main transition:fade>
    <h1>TabCaster</h1>
    <div class="tab-info">
      <strong>Tab ID:</strong>
      <span>{$tab}</span>
    </div>
    <div class="tab-info">
      <strong>Tab Visible:</strong>
      <span>{$visible}</span>
    </div>
    <div class="tab-info">
      <strong>Interacted:</strong>
      <span>{$interacted}</span>
    </div>
    <div class="tab-info">
      <strong>Active:</strong>
      <span>{$active}</span>
    </div>
    <div class="tab-info">
      <strong>Active ID:</strong>
      <span>{$activeID}</span>
    </div>
  </main>
{/if}

<style lang="postcss">
  main {
    padding: 6rem 12rem 10rem;
  }

  .tab-info {
    /* outline: 1px dotted red; */
    display: grid;
    width: 100%;
    max-width: 200rem;
    gap: 20rem;
    text-align: left;
    grid-template-columns: 1fr 2fr;
    border-top: 0.25rem solid #eee;
    padding: 4rem 0;
  }
</style>

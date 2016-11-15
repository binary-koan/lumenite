<style scoped>
  .bench-build {
    width: 20rem;
    padding-top: 0.5rem;
    background: #333;
  }

  .top-level-item {
    display: flex;
    margin: 0.5rem;
    border-radius: 3px;
    background: #222;
  }

  .top-level-item > *:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .top-level-item > .title {
    flex: 1;
    padding: 0.5rem;
  }

  .top-level-item > .action {
    padding: 0.5rem;
    border: none;
    background-color: #222;
    color: white;
    transition: background-color 0.2s;
  }

  .top-level-item > .action:hover {
    background-color: #444;
  }

  .top-level-item > .action:active {
    background-color: #111;
  }
</style>

<template>
  <div class="bench-build">
    <div class="top-level-item">
      <h2 class="title"><span class="icon icon-timeline"></span> Settings</h2>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <div class="top-level-item">
      <h2 class="title"><span class="icon icon-image-file"></span> Assets</h2>
      <button class="action"><span class="icon icon-import"></span></button>
      <button class="action"><span class="icon icon-folder"></span></button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <div class="top-level-item">
      <h2 class="title"><span class="icon icon-fantasy"></span> Behaviours</h2>
      <button class="action"><span class="icon icon-plus"></span></button>
      <button class="action"><span class="icon icon-folder"></span></button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <div class="top-level-item">
      <h2 class="title"><span class="icon icon-film"></span> Scenes</h2>
      <button class="action"><span class="icon icon-plus"></span></button>
      <button class="action"><span class="icon icon-folder"></span></button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bench-build'
  }
</script>

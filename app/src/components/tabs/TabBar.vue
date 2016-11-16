<style scoped>
  .tab-bar {
    display: flex;
    background: #222;
  }

  .tab {
    display: flex;
    align-items: center;
    min-width: 10rem;
    padding: 0.75rem;
  }

  .tab.active {
    background: #333;
  }

  .tab > .icon {
    margin-right: 0.5rem;
  }

  .tab > .title {
    flex: 1;
  }

  .tab > .close {
    background: transparent;
    color: white;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .tab > .close:before {
    content: "×";
  }

  .tab > .close:hover {
    opacity: 1;
  }
</style>

<template>
  <div class="tab-bar">
    <div class="tab active">
      <span class="icon color-icon" style="background-color: #ff0"></span>
      <span class="title">Pacman</span>
      <button class="close"></button>
    </div>
    <div class="tab">
      <span class="icon color-icon" style="background-color: #0ff"></span>
      <span class="title">Inky</span>
      <button class="close"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tab-bar'
  }
</script>

<style scoped>
  .sidebar {
    width: 4rem;
  }

  .link {
    position: relative;
    display: block;
    width: 4rem;
    height: 4rem;

    background-position: center;
    background-repeat: no-repeat;
    background-size: 32px;
    opacity: 0.75;
    transition: opacity 0.2s;
  }

  .link:hover,
  .link.active {
    opacity: 1;
  }

  .link.menu {
    background-image: url(./assets/menu.svg);
  }

  .link.build {
    background-image: url(./assets/build.svg);
  }

  .link.run {
    background-image: url(./assets/run.svg);
  }

  .link.test {
    background-image: url(./assets/test.svg);
  }

  .link.publish {
    background-image: url(./assets/publish.svg);
  }

  .link > .tooltip {
    position: absolute;
    visibility: hidden;
    left: 100%;
    top: 50%;
    margin-top: -1rem;
    padding: 0.5rem;
    line-height: 1;

    background: #222;
    color: white;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .link:hover > .tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>

<template>
  <div class="sidebar">
    <a class="link menu" href="#">
      <span class="tooltip">Menu</span>
    </a>
    <a class="link build active" href="#">
      <span class="tooltip">Build</span>
    </a>
    <a class="link run" href="#">
      <span class="tooltip">Run</span>
    </a>
    <a class="link test" href="#">
      <span class="tooltip">Test</span>
    </a>
    <a class="link publish" href="#">
      <span class="tooltip">Publish</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'sidebar'
  }
</script>

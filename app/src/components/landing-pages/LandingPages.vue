<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background-color: #333;
  }

  .page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 1rem;
  }

  @media screen and (min-width: 700px) {
    .page {
      left: 50%;
      right: auto;
      width: 50vw;
      margin-left: -25vw;
    }

    .page:not(.tall) {
      top: 50%;
      bottom: auto;
      height: 50vh;
      margin-top: -25vh;
    }
  }

  .page-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .back {
    position: absolute;
    top: 1rem;
    left: -1.5rem;
    width: 1.5rem;
    font-size: 1.5rem;
    opacity: 0.75;
    transition: opacity 0.2s;
  }

  .back:hover {
    opacity: 1;
  }
</style>

<template>
  <div class="overlay">
    <div class="page hidden">
      <landing-page></landing-page>
    </div>

    <div class="page tall">
      <button class="back"><span class="icon icon-arrows-long-left"></span></button>
      <h1 class="page-title">Create Project</h1>
      <create-project-page></create-project-page>
    </div>
  </div>
</template>

<script>
  import LandingPage from './LandingPage'
  import CreateProjectPage from './CreateProjectPage'

  export default {
    name: 'landing-pages',
    components: {
      LandingPage,
      CreateProjectPage
    }
  }
</script>

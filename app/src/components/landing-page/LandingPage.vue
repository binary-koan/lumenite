<style scoped>
  .overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background-color: #333;
  }

  .landing-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  @media screen and (min-width: 700px) {
    .overlay {
      align-items: center;
      justify-content: center;
    }

    .landing-page {
      flex: 0 0 50vw;
      height: 50vh;
    }
  }

  .recent {
    padding: 1rem;
    border-radius: 5px;
    background: #222;
  }

  .recent-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .recent-list a {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 3px;
    color: white;
    transition: background-color 0.2s;
  }

  .recent-list a:hover {
    background-color: #333;
  }

  .recent-list .project-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;

    border-radius: 3px;
    font-size: 1.5rem;
    background: #eee;
    color: #666;
  }

  .recent-list .title {
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
  }

  .recent-list .info {
    color: #aaa;
  }

  .actions {
    display: flex;
    margin-top: 0.5rem;
  }

  .actions button {
    flex: 1;
    padding: 1rem;
    border-radius: 3px;
    font-size: 1.1rem;
    background: transparent;
    color: white;
    transition: background-color 0.2s;
  }

  .actions button:hover {
    background-color: #444;
  }
</style>

<template>
  <div class="overlay">
    <div class="landing-page">
      <div class="recent">
        <h2 class="recent-title">Recent Projects</h2>
        <ul class="recent-list">
          <li>
            <a href="#">
              <div class="project-icon"><span class="icon icon-folder"></span></div>
              <div class="description">
                <h3 class="title">Pacman</h3>
                <p class="info">~/Projects/Pacman</p>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div class="actions">
        <button><span class="icon icon-plus"></span> Create Project</button>
        <button><span class="icon icon-opened-folder"></span> Open Folder</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'landing-page'
  }
</script>

<style scoped>
  .templates-title {
    margin-bottom: 0.75rem;
  }

  .templates {
    padding: 1rem;
    border-radius: 5px;
    background: #222;
  }

  .template {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 3px;
    color: white;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  input:checked + .template {
    background-color: #333;
  }

  .template .template-icon {
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

  .template .title {
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
  }

  .template .info {
    color: #aaa;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #bbb;
    border-radius: 3px;
    background-color: white;
    color: #222;
  }

  .input-group label {
    margin-bottom: 0.5rem;
  }

  .input-group input {
    border: none;
    background: none;
    color: inherit;
    font-weight: 500;
  }

  .input-group .input-with-addon {
    display: flex;
  }

  .input-group .input-with-addon input {
    flex: 1;
  }
</style>

<template>
  <div>
    <div class="input-group">
      <label for="projectName">Name</label>
      <input id="projectName" type="text" value="Pacman" />
    </div>

    <div class="input-group">
      <label for="projectLocation">Location</label>
      <div class="input-with-addon">
        <input id="projectLocation" type="text" value="/home/jono/Projects/Pacman" />
        <button><span class="icon icon-opened-folder"></button>
      </div>
    </div>

    <div class="templates">
      <h2 class="templates-title">Template</h2>
      <ul>
        <li>
          <input id="emptyTemplate" class="hidden" type="radio" checked="checked" name="template" value="empty" />
          <label for="emptyTemplate" class="template">
            <div class="template-icon"><span class="icon icon-circle"></span></div>
            <div>
              <h3 class="title">Empty</h3>
              <p class="info">Start from scratch.</p>
            </div>
          </label>
        </li>
        <li>
          <input id="platformerTemplate" class="hidden" type="radio" name="template" value="platformer" />
          <label for="platformerTemplate" class="template">
            <div class="template-icon"><span class="icon icon-babys-room"></span></div>
            <div>
              <h3 class="title">Platformer</h3>
              <p class="info">Allow the player to run and jump in a side-on world.</p>
            </div>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create-project-page'
  }
</script>

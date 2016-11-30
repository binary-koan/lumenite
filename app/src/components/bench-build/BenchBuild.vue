<style scoped>
  .bench-build {
    width: 20rem;
    padding-top: 0.25rem;
    background: #222;
  }

  .top-level-item {
    display: flex;
    margin: 0.75rem;
    border-radius: 3px;
    background: #333;
  }

  .top-level-item.expanded {
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  .top-level-item > *:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .top-level-item > *:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .top-level-item > button {
    padding: 0.5rem;
    background-color: #333;
    color: white;
    transition: background-color 0.2s;
  }

  .top-level-item > button:hover {
    background-color: #444;
  }

  .top-level-item > button:active {
    background-color: #111;
  }

  .top-level-item > .title {
    flex: 1;
    padding: 0.5rem;
    text-align: left;
  }

  .top-level-item + .folder-contents {
    padding-left: 2.25rem;
  }

  .folder-contents {
    padding-left: 1.25rem;
  }

  .file,
  .folder-title {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  .file > .icon,
  .folder-title > .icon {
    margin-right: 0.25rem;
  }

  .file {
    margin-left: 0.25rem;
  }

  .folder-title {
    margin-left: -1rem;
  }
</style>

<template>
  <div class="bench-build">
    <div class="top-level-item" :class="{ expanded: settingsFolder.expanded }">
      <button class="title" @click="toggleSettings"><span class="icon icon-timeline"></span> Settings</button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <div class="top-level-item" :class="{ expanded: assetsFolder.expanded }">
      <button class="title" @click="toggleAssets"><span class="icon icon-image-file"></span> Assets</button>
      <button class="action"><span class="icon icon-import"></span></button>
      <button class="action"><span class="icon icon-folder"></span></button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <div class="top-level-item" :class="{ expanded: behavioursFolder.expanded }">
      <button class="title" @click="toggleBehaviours"><span class="icon icon-fantasy"></span> Behaviours</button>
      <button class="action"><span class="icon icon-plus"></span></button>
      <button class="action"><span class="icon icon-folder"></span></button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <div class="top-level-item" :class="{ expanded: scenesFolder.expanded }">
      <button class="title" @click="toggleScenes"><span class="icon icon-film"></span> Scenes</button>
      <button class="action"><span class="icon icon-plus"></span></button>
      <button class="action"><span class="icon icon-folder"></span></button>
      <button class="action"><span class="icon icon-more"></span></button>
    </div>

    <ul class="folder-contents">
      <li class="folder">
        <div class="folder-title"><span class="icon icon-sort-right"></span> Enemies</div>
      </li>
      <li class="folder">
        <div class="folder-title"><span class="icon icon-sort-down"></span> Levels</div>
        <ul class="folder-contents">
          <li class="folder">
            <div class="folder-title"><span class="icon icon-sort-down"></span> Hard</div>
            <ul class="folder-contents">
              <li class="file"><span class="icon color-icon" style="background-color: #0ff"></span> Level 24</li>
            </ul>
          </li>
          <li class="file"><span class="icon color-icon" style="background-color: #0ff"></span> Level 1</li>
        </ul>
      </li>
      <li class="file"><span class="icon color-icon" style="background-color: #ff0"></span> Pacman</li>
    </ul>
  </div>
</template>

<script>
  import find from 'lodash/find'

  export default {
    name: 'bench-build',
    computed: {
      settingsFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Settings')
      },

      assetsFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Assets')
      },

      behavioursFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Behaviours')
      },

      scenesFolder() {
        return find(this.$store.state.fileTree.baseFolders, folder => folder.name === 'Scenes')
      }
    },
    methods: {
      toggleSettings() {
        this.$store.dispatch('toggleFolder', ['Settings'])
      },

      toggleAssets() {
        this.$store.dispatch('toggleFolder', ['Assets'])
      },

      toggleBehaviours() {
        this.$store.dispatch('toggleFolder', ['Behaviours'])
      },

      toggleScenes() {
        this.$store.dispatch('toggleFolder', ['Scenes'])
      }
    }
  }
</script>

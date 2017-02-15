<style lang="stylus" scoped>
  @import '~app/styles/definitions'

  .mesh-editor {
    flex-layout: row
    height: 100%
  }

  .canvas-wrapper {
    flex: 1
    min-width: 20rem
    margin-right: $gap-medium

    canvas {
      width: 100%
      height: 100%
    }
  }

  .checkbox {
    margin-left: $gap-small
  }

  .materials-list {
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0
  }

  .add-material {
    display: block
    width: 100%
    border-top-left-radius: 0
    border-top-right-radius: 0
  }
</style>

<template>
  <div class="mesh-editor">
    <div class="canvas-wrapper">
      <canvas></canvas>
    </div>
    <elx-settings-form :title="mesh.source">
      <div>
        <elx-label>Initial rotation</elx-label>
        <elx-multi-input :parts="['x', 'y', 'z']"></elx-multi-input>
      </div>

      <div>
        <elx-label>Initial scale</elx-label>
        <elx-multi-input :parts="['x', 'y', 'z']"></elx-multi-input>
      </div>

      <elx-label>Collision</elx-label>

      <div class="checkbox">
        <el-checkbox>Check collisions</el-checkbox>
      </div>

      <div class="checkbox">
        <el-checkbox>Is blocker</el-checkbox>
      </div>

      <elx-label>Shadows</elx-label>

      <div class="checkbox">
        <el-checkbox>Cast shadows</el-checkbox>
      </div>

      <div class="checkbox">
        <el-checkbox>Receive shadows</el-checkbox>
      </div>

      <div>
        <elx-label>Materials</elx-label>
        <elx-list-box class="materials-list"></elx-list-box>
        <el-button class="add-material"><span class="icon icon-plus"></span> Add</el-button>
      </div>
    </elx-settings-form>
  </div>
</template>

<script>
  import BABYLON from 'babylonjs'

  export default {
    name: 'mesh-asset-editor',
    props: ['tab'],

    computed: {
      mesh() {
        return this.tab.content
      },
    },

    mounted() {
      const canvas = this.$el.querySelector("canvas")
      const engine = this.engine = new BABYLON.Engine(canvas, true)

      // This begins the creation of a function that we will 'call' just after it's built
      var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0, 1, 0);

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = .5;

        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.position.y = 1;

        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        return scene;
      }

      const scene = createScene();

      engine.runRenderLoop(function () {
        scene.render();
      });
    },

    beforeDestroy() {
      this.engine.dispose()
    }
  }
</script>

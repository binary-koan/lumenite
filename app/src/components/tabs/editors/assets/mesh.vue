<style lang="stylus" scoped>
  @import '~src/styles/definitions'

  canvas {
    width: 400px;
    height: 300px;
  }
</style>

<template>
  <div class="mesh-editor">
    MESH
    <canvas></canvas>
  </div>
</template>

<script>
  import BABYLON from 'babylonjs'

  export default {
    name: 'mesh-asset-editor',

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

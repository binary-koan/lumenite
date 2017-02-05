<template>
  <div class="elx-multi-input">
    <el-input v-for="part in parts" :style="{ width: `${100 / parts.length - 1}%` }">
      <template slot="prepend">{{ part }}</template>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "elx-multi-input",
    props: ["parts"]
  }
</script>

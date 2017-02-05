<template>
  <div class="elx-multi-input">
    <el-input v-for="part in parts">
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

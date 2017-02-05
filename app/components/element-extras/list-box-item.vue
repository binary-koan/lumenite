<template>
  <li>
    <a href="#" class="elx-list-box__link" @click="emitClick">
      <slot></slot>
    </a>
  </li>
</template>

<script>
  export default {
    name: "elx-list-box-item",
    methods: {
      emitClick(e) {
        this.$emit("click", e)
      }
    }
  }
</script>

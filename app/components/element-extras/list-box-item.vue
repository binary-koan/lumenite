<template>
  <li>
    <a href="#" class="elx-list-box__link" :class="{ 'is-selected': selected }" @click="emitClick">
      <slot></slot>
    </a>
  </li>
</template>

<script>
  export default {
    name: "elx-list-box-item",
    props: ["selected"],
    methods: {
      emitClick(e) {
        this.$emit("click", e)
      }
    }
  }
</script>

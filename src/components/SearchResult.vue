<template>
  <div>
    <div v-for="item in result" :key="item.ID">
      {{ item }}
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  props: {
    result: Array,
  },
  setup() {},
};
</script>

<style lang="scss"></style>

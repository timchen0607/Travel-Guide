<template>
  <div>
    <div v-text="params"></div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  name: "Search",
  setup() {
    const route = useRoute();
    const params = computed(() => route.params);

    return { params };
  },
};
</script>

<style lang="scss"></style>

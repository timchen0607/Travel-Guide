<template>
  <div>
    <div v-text="result"></div>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getSearch } from "../modules.js";

export default {
  name: "Search",
  setup() {
    const route = useRoute();
    const params = computed(() => route.params);
    const result = ref(null);
    const type = computed(() => {
      if (Object.keys(params.value).length === 0) return "Default";
      else return params.value.city ? "Search" : "Nearby";
    });
    getSearch(type.value);

    watch(params, () => {
      getSearch(type.value);
    });

    return { result };
  },
};
</script>

<style lang="scss"></style>

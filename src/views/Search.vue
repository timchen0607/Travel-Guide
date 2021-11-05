<template>
  <div>
    <SearchResult :result="result"></SearchResult>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getTravelInfo, getNearbyInfo } from "../modules.js";
import SearchResult from "../components/SearchResult.vue";

export default {
  name: "Search",
  props: {
    mode: String,
  },
  components: { SearchResult },
  setup(props) {
    const route = useRoute();
    const params = computed(() => route.params);
    const result = ref(null);
    const type = computed(() => {
      if (Object.keys(params.value).length === 0) return "Default";
      else return params.value.city ? "Search" : "Nearby";
    });
    const getSearch = () => {
      if (type.value === "Search") {
        const { city, page, keyword } = params.value;
        getTravelInfo(props.mode, city, keyword, page).then(
          (res) => (result.value = res)
        );
      }
      if (type.value === "Nearby") {
        const { lat, lon, page } = params.value;
        getNearbyInfo(props.mode, lat, lon, page).then(
          (res) => (result.value = res)
        );
      }
    };
    getSearch();

    watch(params, () => getSearch());

    return { result };
  },
};
</script>

<style lang="scss"></style>

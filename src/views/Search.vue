<template>
  <div>
    <div v-for="item in result" :key="item.ID">
      <p>{{ item.ID }}</p>
      <router-link :to="`/D/${item.ID}/`" v-text="item.Name"></router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getTravelInfo, getNearbyInfo } from "../modules.js";

export default {
  name: "Search",
  props: {
    mode: String,
  },
  setup(props) {
    const route = useRoute();
    const params = computed(() => route.params);
    const result = ref(null);
    const type = computed(() => (params.value.city ? "Search" : "Nearby"));
    const getSearch = () => {
      if (!params.value.page) return;
      if (type.value === "Search") {
        const { city, page, keyword } = params.value;
        getTravelInfo(props.mode, city, page, keyword).then(
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

<style lang="scss" scoped></style>

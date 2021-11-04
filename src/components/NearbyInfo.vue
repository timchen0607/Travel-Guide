<template>
  <div>
    <div v-for="item in nearbyData" :key="item.ID">
      {{ item }}
      <hr />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getNearbyInfo } from "../modules.js";

export default {
  name: "NearbyInfo",
  setup() {
    // mode => ScenicSpot/Restaurant/Hotel/Activity
    const mode = "ScenicSpot";
    const lat = 23.7083775;
    const lon = 120.398561;
    const nearbyData = ref(null);

    getNearbyInfo(mode, lat, lon).then((res) => (nearbyData.value = res));

    return { nearbyData };
  },
};
</script>

<style lang="scss"></style>

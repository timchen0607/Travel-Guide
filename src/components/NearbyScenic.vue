<template>
  <div>
    <div v-for="item in scenicData" :key="item.ID">
      {{ item }}
      <hr />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getNearbyTravelInfo } from "../modules.js";

export default {
  name: "NearbyScenic",
  setup() {
    const mode = "ScenicSpot";
    const top = 30;
    const skip = 0;
    const lat = 23.7083775;
    const lon = 120.398561;
    const meters = 10000;
    const scenicData = ref(null);

    getNearbyTravelInfo(mode, top, skip, lat, lon, meters).then(
      (res) => (scenicData.value = res)
    );

    return { scenicData };
  },
};
</script>

<style lang="scss"></style>

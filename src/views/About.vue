<template>
  <div class="about">
    <h1>This is an about page</h1>
    <NearbyInfo></NearbyInfo>
  </div>
</template>

<script>
import { getTravelInfo } from "../modules.js";
import NearbyInfo from "../components/NearbyInfo.vue";

export default {
  name: "About",
  components: { NearbyInfo },
  setup() {
    getTravelInfo("ScenicSpot").then((res) => console.log(res));
    // getTravelInfo("Restaurant").then((res) => console.log(res));
    // getTravelInfo("Hotel").then((res) => console.log(res));
    // getTravelInfo("Activity").then((res) => console.log(res));
  },
};
</script>

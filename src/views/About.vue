<template>
  <div class="about">
    <h1>This is an about page</h1>
    <NearbyScenic></NearbyScenic>
  </div>
</template>

<script>
import { getTravelInfo } from "../modules.js";
import NearbyScenic from "../components/NearbyScenic.vue";

export default {
  name: "About",
  components: { NearbyScenic },
  setup() {
    getTravelInfo("ScenicSpot", 10, 0).then((res) => console.log(res));
    // getTravelInfo("Restaurant", 10, 0).then((res) => console.log(res));
    // getTravelInfo("Hotel", 10, 0).then((res) => console.log(res));
    // getTravelInfo("Activity", 10, 0).then((res) => console.log(res));
  },
};
</script>

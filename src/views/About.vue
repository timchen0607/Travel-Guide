<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { getTravelInfo } from "@/modules.js";

export default {
  name: "About",
  setup() {
    getTravelInfo("ScenicSpot", 10, 0).then((res) => console.log(res));
    // getTravelInfo("Restaurant", 10, 0).then((res) => console.log(res));
    // getTravelInfo("Hotel", 10, 0).then((res) => console.log(res));
    // getTravelInfo("Activity", 10, 0).then((res) => console.log(res));
  },
};
</script>

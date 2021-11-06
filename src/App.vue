<template>
  <div class="container">
    <header class="head">
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/Taiwan/1/">Search1</router-link> |
        <router-link to="/Taiwan/1/游泳/">Search2</router-link> |
        <router-link to="/23.7083775/120.398561/1/"> Search3 </router-link>|
        <router-link to="/D/C3_315081000H_020111">Detail1</router-link> |
        <router-link to="/D/C1_315080500H_000068">Detail2</router-link> |
        <router-link to="/D/C4_315080000H_000539">Detail3</router-link> |
        <router-link to="/D/C2_315080000H_080485">Detail4</router-link>
      </div>
    </header>
    <div class="box">
      <router-view :mode="mode" />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "App",
  setup() {
    const mode = ref("ScenicSpot");

    return { mode };
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/_variables.scss";

.container {
  align-items: flex-start;
}
.head {
  position: sticky;
  top: 0;
  width: min(100vw, 354px);
  min-height: 100vh;
  background-color: $c_light;
  box-shadow: 0px 14px 24px #00000011;
}
.box {
  flex: 1;
}
</style>

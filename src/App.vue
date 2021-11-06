<template>
  <div class="container">
    <header class="head">
      <Header></Header>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/Taiwan/1/">Search1</router-link> |
        <router-link to="/Taiwan/1/游泳/">Search2</router-link> |
        <router-link to="/23.7083775/120.398561/1/"> Search3 </router-link> |
        <router-link to="/D/C3_315081000H_020111">Detail1</router-link> |
        <router-link to="/D/C1_315080500H_000068">Detail2</router-link> |
        <router-link to="/D/C4_315080000H_000539">Detail3</router-link> |
        <router-link to="/D/C2_315080000H_080485">Detail4</router-link>
      </div>
      <div>
        <i class="ico-circled-up"></i>
        <i class="ico-search-1"></i>
        <i class="ico-print"></i>
        <i class="ico-clock-time"></i>
        <i class="ico-ui-touch-phone"></i>
        <i class="ico-share"></i>
        <i class="ico-location-pin"></i>
        <i class="ico-rounded-left"></i>
        <i class="ico-settings"></i>
        <i class="ico-heart"></i>
        <i class="icoTW-main-island"></i>
      </div>
    </header>
    <div class="box">
      <router-view :mode="mode" />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { Header },
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
  padding: 1.5rem;
  background-color: $c_light;
  box-shadow: 0px 14px 24px #00000011;
}
.box {
  flex: 1;
}
</style>

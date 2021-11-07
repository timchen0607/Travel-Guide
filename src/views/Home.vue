<template>
  <div class="home">
    <div class="banner shadow">
      <h1 class="banner-text">探索。<br />福爾摩沙</h1>
    </div>
    <h2 class="fz-md c-sce"><i class="ico-beach"></i> 熱門景點</h2>
    <h2 class="fz-md c-res"><i class="ico-restaurant"></i> 品嚐美食</h2>
    <h2 class="fz-md c-htl"><i class="ico-hotel"></i> 住宿推薦</h2>
    <h2 class="fz-md c-act"><i class="ico-flag-alt-2"></i> 觀光活動</h2>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Home",
  setup() {
    onMounted(() => (document.title = "Travel Guide"));
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.home {
  padding: min(2rem, 4vw);
}
.banner {
  position: relative;
  width: 100%;
  height: min(300px, 40vw);
  background: url(../assets/images/banner_Home.png) no-repeat bottom right /
      contain,
    $c_light;
  border-radius: 1rem;
  overflow: hidden;
  user-select: none;
  &-text {
    position: absolute;
    top: 60%;
    left: 1em;
    font-size: min(4rem, 5vw);
    font-weight: bold;
    transform: translateY(-50%);
  }
}
</style>

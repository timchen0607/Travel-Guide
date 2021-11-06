<template>
  <div class="home">
    <div class="banner">
      <h2 class="banner-text">探索。<br />福爾摩沙</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.home {
  padding: min(1.5rem, 4vw);
}
.banner {
  display: flex;
  align-items: center;
  height: min(300px, 40vw);
  background: url("../assets/images/banner_home.png") no-repeat center right /
      contain,
    $c_light;
  border-radius: 1rem;
  box-shadow: 0px 0px 1.5rem #00000011;
  &-text {
    font-size: min(4rem, 5vw);
    margin-left: 1em;
    font-weight: bold;
  }
}
</style>

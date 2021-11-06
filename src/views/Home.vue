<template>
  <div class="home">
    <div class="banner">
      <img src="../assets/images/banner_home.png" alt="探索。福爾摩沙" />
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
  position: relative;
  img {
    object-position: center right;
    object-fit: contain;
  }
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

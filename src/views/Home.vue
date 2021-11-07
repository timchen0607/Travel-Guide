<template>
  <div class="home">
    <div class="banner shadow">
      <img
        class="banner-img"
        src="../assets/images/banner_home.png"
        alt="探索。福爾摩沙"
        title="探索。福爾摩沙"
      />
      <h1 class="banner-text">探索。<br />福爾摩沙</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  setup() {
    document.title = "Travel Guide";
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
  background-color: $c_light;
  border-radius: 1rem;
  overflow: hidden;
  &-img {
    width: 100%;
    height: 100%;
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

<template>
  <div :class="'card-' + loadMode">
    <div class="card bdrs-sm" v-for="idx in amount" :key="idx">
      <div class="card-box"></div>
      <div class="card-content">
        <h2 class="card-title"></h2>
        <p class="card-text"></p>
        <p class="card-text"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: { loadMode: String, amount: Number },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

@keyframes loading {
  to {
    background-position: -20%;
  }
}
@mixin background {
  background: linear-gradient(
      110deg,
      transparent 40%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 60%
    ),
    $c_main;
  opacity: 0.3;
  background-size: 200% 100%;
  background-position: 120%;
  animation: 1.5s loading ease-in-out infinite;
}

.card {
  &-box {
    @include background;
  }
  &-title {
    @include background;
    min-height: 1.5rem;
    animation-delay: 0.08s;
  }
  &-text {
    @include background;
    min-height: 2rem;
    margin-bottom: 0.5rem;
    animation-delay: 0.1s;
  }
}
</style>

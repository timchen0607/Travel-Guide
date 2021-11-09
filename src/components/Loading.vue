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

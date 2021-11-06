<template>
  <div class="header">
    <h1><a href="/" class="logo">TRAVEL</a></h1>
    <div class="select">
      <input type="text" class="select-input" />
      <button></button>
    </div>
    <div class="select">
      <input type="text" class="select-input" />
      <button></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.logo {
  display: block;
  width: 150px;
  height: 70px;
  color: transparent;
  background: url(../assets/images/logo.png) no-repeat center center / contain;
  user-select: none;
}
.select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0;
  padding: 0.5rem 0.75rem;
  background-color: $c_secondary-light;
  border: 1px solid $c_secondary;
  border-radius: 0.5rem;
  &-input {
    flex: 1;
    font-size: 1.25rem;
    color: $c_dark;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
</style>

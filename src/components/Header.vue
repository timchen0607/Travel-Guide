<template>
  <div class="header">
    <div class="df-between">
      <a href="/" class="header-logo"></a>
      <button class="header-btn" @click="closeHeader">
        <i class="ico-rounded-left"></i>
      </button>
    </div>
    <div class="select df-center">
      <input type="text" class="select-input" placeholder="目的地" disabled />
      <button class="select-btn"><i class="ico-circled-up"></i></button>
    </div>
    <div class="select df-center">
      <input type="text" class="select-input" placeholder="搜尋關鍵字" />
      <button class="select-btn"><i class="ico-search-1"></i></button>
    </div>
    <hr class="hr" />
    <h2 class="fz-md">精選主題</h2>
    <ul class="featured df-around">
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item active">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="fz-sm">住宿推薦</h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    closeHeader: Function,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.header {
  &-logo {
    display: block;
    width: 150px;
    height: 70px;
    background: url(../assets/images/logo.png) no-repeat center center / contain;
  }
  &-btn {
    font-size: 1.8rem;
    color: $c_main;
    background-color: $c_secondary-light;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    opacity: 0;
    @include pad {
      opacity: 1;
    }
  }
}
.select {
  margin: 1.5rem 0;
  padding: 0.5rem 0.75rem;
  background-color: $c_secondary-light;
  border: 1px solid $c_secondary;
  border-radius: 0.5rem;
  &-input {
    width: 100%;
    font: 1.25rem $font;
    color: $c_dark;
    background-color: transparent;
    border: none;
    outline: none;
    &::placeholder {
      font: 1.25rem $font;
      color: $c_secondary;
    }
  }
  &-btn {
    font-size: 1.5rem;
    color: $c_main;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
}
.hr {
  margin: 0;
  border: 1px solid $c_secondary;
}
.featured {
  flex-wrap: wrap;
  &-item {
    width: 48%;
    margin-bottom: 0.8rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
    transition: box-shadow 0.5s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0px 10px $c_secondary;
    }
    &.active {
      border: 1px solid $c_main;
    }
  }
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.5rem;
    height: 4.5rem;
    margin: 0 auto;
    font-size: 3rem;
    color: $c_light;
    background-color: $c_Activity;
    border-radius: 50%;
  }
  .fz-sm {
    text-align: center;
  }
}
</style>

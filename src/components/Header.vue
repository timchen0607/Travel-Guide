<template>
  <div class="header">
    <h1><a href="/" class="logo">TRAVEL</a></h1>
    <div class="select">
      <input type="text" class="select-input" placeholder="目的地" disabled />
      <button class="select-btn"><i class="ico-circled-up"></i></button>
    </div>
    <div class="select">
      <input type="text" class="select-input" placeholder="搜尋關鍵字" />
      <button class="select-btn"><i class="ico-search-1"></i></button>
    </div>
    <hr class="hr" />
    <h4 class="title-4">精選主題</h4>
    <ul class="featured">
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item active">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
      <li class="featured-item">
        <div class="featured-icon"><i class="icoTW-main-island"></i></div>
        <h5 class="title-5">住宿推薦</h5>
      </li>
    </ul>
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
    color: $c_success;
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
.title-4 {
  margin: 1.5rem 0;
}
.featured {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    width: 40%;
    margin-bottom: 0.8rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0px 10px $c_secondary;
    }
    &.active {
      color: $c_light;
      background-color: $c_restaurant;
    }
  }
  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    font-size: 3rem;
    color: $c_light;
    background-color: $c_restaurant;
    border-radius: 50%;
  }
  .title-5 {
    text-align: center;
    font-weight: bold;
  }
}
</style>
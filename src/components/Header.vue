<template>
  <div class="header">
    <div class="df-between header-main">
      <router-link to="/" class="header-logo"></router-link>
      <button class="header-btn" @click="closeHeader">
        <i class="ico-rounded-left"></i>
      </button>
    </div>
    <div class="select df-center" @click="openCity = !openCity">
      <span class="select-input" v-text="cityName(city)"></span>
      <button :class="['select-btn', { down: !openCity }]">
        <i class="ico-circled-up"></i>
      </button>
    </div>
    <div
      :class="[
        'drowdown df-around bdrs-xl',
        { shadow: openCity },
        { show: openCity },
      ]"
      @click="openCity = !openCity"
    >
      <span
        :class="['drowdown-item bdrs-sm', { active: city === 'Taiwan' }]"
        @click="setCity('Taiwan')"
      >
        臺灣
      </span>
      <h3 class="fz-md drowdown-title">北部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: item === city }]"
        v-for="item in cityFilter('North')"
        :key="item"
        v-text="cityName(item)"
        @click="setCity(item)"
      ></span>
      <h3 class="fz-md drowdown-title">中部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: item === city }]"
        v-for="item in cityFilter('Central')"
        :key="item"
        v-text="cityName(item)"
        @click="setCity(item)"
      ></span>
      <h3 class="fz-md drowdown-title">南部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: item === city }]"
        v-for="item in cityFilter('South')"
        :key="item"
        v-text="cityName(item)"
        @click="setCity(item)"
      ></span>
      <h3 class="fz-md drowdown-title">東部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: item === city }]"
        v-for="item in cityFilter('East')"
        :key="item"
        v-text="cityName(item)"
        @click="setCity(item)"
      ></span>
      <h3 class="fz-md drowdown-title">離島地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: item === city }]"
        v-for="item in cityFilter('Outer')"
        :key="item"
        v-text="cityName(item)"
        @click="setCity(item)"
      ></span>
    </div>
    <div class="textbox df-center">
      <input
        type="text"
        class="textbox-input"
        placeholder="多筆資料用空格格開(選填)"
        v-model="keyword"
        @keypress.enter="goSearch()"
      />
      <button class="textbox-btn" @click="goSearch()">
        <i class="ico-search-1"></i>
      </button>
    </div>
    <div class="df-around">
      <span
        :class="['searchMode bdrs-sm', { active: searchMode === 'ScenicSpot' }]"
        @click="searchMode = 'ScenicSpot'"
      >
        景點
      </span>
      <span
        :class="['searchMode bdrs-sm', { active: searchMode === 'Restaurant' }]"
        @click="searchMode = 'Restaurant'"
      >
        餐飲
      </span>
      <span
        :class="['searchMode bdrs-sm', { active: searchMode === 'Hotel' }]"
        @click="searchMode = 'Hotel'"
      >
        旅宿
      </span>
      <span
        :class="['searchMode bdrs-sm', { active: searchMode === 'Activity' }]"
        @click="searchMode = 'Activity'"
      >
        活動
      </span>
    </div>
    <button class="searchBtn fz-md bdrs-sm" @click="goSearch()">
      <i class="ico-search-1"></i>
      <span> 開始搜尋</span>
    </button>
    <hr class="hr" />
    <h3 class="fz-md">精選主題</h3>
    <ul class="theme df-around">
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('ScenicSpot', '觀光,遊憩')"
      >
        <img
          src="../assets/images/theme_1.png"
          alt="觀光遊憩"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">觀光遊憩</h4>
      </div>
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('ScenicSpot', '自然,風景')"
      >
        <img
          src="../assets/images/theme_2.png"
          alt="自然風景"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">自然風景</h4>
      </div>
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('Restaurant', '地方特產')"
      >
        <img
          src="../assets/images/theme_3.png"
          alt="地方特產"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">地方特產</h4>
      </div>
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('Restaurant', '異國料理')"
      >
        <img
          src="../assets/images/theme_4.png"
          alt="異國料理"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">異國料理</h4>
      </div>
      <div class="theme-item bdrs-sm" @click="goSearch('Hotel', '度假,民宿')">
        <img
          src="../assets/images/theme_5.png"
          alt="度假民宿"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">度假民宿</h4>
      </div>
      <div class="theme-item bdrs-sm" @click="goSearch('Hotel', '國際,旅館')">
        <img
          src="../assets/images/theme_6.png"
          alt="國際旅館"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">國際旅館</h4>
      </div>
      <div class="theme-item bdrs-sm" @click="goSearch('Activity', '節慶活動')">
        <img
          src="../assets/images/theme_7.png"
          alt="節慶活動"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">節慶活動</h4>
      </div>
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('Activity', '藝文,體驗')"
      >
        <img
          src="../assets/images/theme_8.png"
          alt="藝文體驗"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">藝文體驗</h4>
      </div>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { cityLib } from "../lib.js";

export default {
  name: "Header",
  props: { closeHeader: Function, city: String, setCity: Function },
  setup(props) {
    const cityFilter = (region) =>
      Object.keys(cityLib).filter((item) => cityLib[item].region === region);
    const cityName = (city) => cityLib[city].name;
    const openCity = ref(false);
    const keyword = ref("");
    const searchMode = ref("ScenicSpot");
    const router = useRouter();
    const goSearch = (
      mode = searchMode.value,
      key = keyword.value.split(" ").join()
    ) => {
      router.replace({
        name: "Search",
        params: { mode: mode, city: props.city, keyword: key },
      });
      props.closeHeader();
    };

    return {
      cityFilter,
      cityName,
      openCity,
      keyword,
      searchMode,
      goSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.header {
  &-main {
    position: relative;
    z-index: 2;
    &::after {
      content: "";
      position: absolute;
      top: -1.5rem;
      left: -1.5rem;
      right: -1.5rem;
      bottom: -4.5rem;
      background-color: $c_light;
      z-index: -1;
    }
  }
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
.select,
.textbox {
  flex-wrap: nowrap;
  margin-top: 1.5rem;
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
    text-decoration: none;
    border: none;
    outline: none;
    transform: rotate(360deg);
    transition: transform 0.5s;
    cursor: pointer;
  }
}
.select {
  position: relative;
  z-index: 2;
  cursor: pointer;
  &-btn.down {
    transform: rotate(180deg);
  }
}
.drowdown {
  position: absolute;
  top: -700px;
  left: 1.5rem;
  right: 1.5rem;
  justify-content: start;
  padding: 0.5rem;
  background-color: $c_light;
  z-index: 1;
  transition: top 0.5s, box-shadow 0.5s 0.5s;
  &.show {
    top: 168px;
  }
  &-title {
    position: relative;
    width: 100%;
    margin: 0.3rem 0;
    &:after {
      content: "";
      position: absolute;
      bottom: 3px;
      left: 0px;
      width: 4em;
      height: 5px;
      background-color: $c_main;
      z-index: -1;
    }
  }
  &-item {
    display: block;
    margin: 0.2rem min(0.5rem, 1vw);
    padding: 0.3rem 1em;
    border: 1px solid $c_main;
    transition: color 0.5s, background-color 0.5s;
    cursor: pointer;
    &:hover,
    &.active {
      color: $c_light;
      background-color: $c_main;
    }
  }
}
.searchMode {
  margin: 1rem 0;
  padding: 0.1rem 0.5rem;
  color: $c_main;
  border: 1px solid $c_main;
  cursor: pointer;
  &:hover,
  &.active {
    color: $c_light;
    background-color: $c_main;
  }
}
.searchBtn {
  display: none;
  width: 100%;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  color: $c_light;
  background-color: $c_main;
  border: none;
  outline: none;
  @include pad {
    display: block;
  }
}
.hr {
  margin: 0;
  border: 1px solid $c_secondary;
}
.theme {
  &-item {
    position: relative;
    width: 45%;
    height: 6rem;
    margin-bottom: 0.5rem;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
    &:hover .theme-text {
      background-color: #00000066;
    }
  }
  &-img {
    width: 100%;
    height: 100%;
    object-position: center center;
    object-fit: cover;
  }
  &-text {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: $c_light;
    background-color: #00000019;
    transition: background-color 0.5s;
  }
}
</style>

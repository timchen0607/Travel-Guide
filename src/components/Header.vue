<template>
  <div class="header">
    <div class="df-between header-main">
      <router-link to="/" class="header-logo"></router-link>
      <button class="header-btn" @click="closeHeader">
        <i class="ico-rounded-left"></i>
      </button>
    </div>
    <div class="select df-center" @click="openCity = !openCity">
      <span
        class="select-input"
        v-text="`${cityName(city)}｜${modeName}｜${strictName}`"
      ></span>
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
    >
      <h3 class="fz-md drowdown-title">選擇區域</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: city === 'Taiwan' }]"
        @click="setCity('Taiwan')"
      >
        臺灣
      </span>
      <div class="tabs">
        <input
          type="radio"
          :id="`tabs${i}`"
          class="tabs-radio"
          name="tabs"
          v-for="i in 4"
          :key="i"
          :checked="i === 1"
        />
        <ul class="tabs-cnt">
          <li
            class="tabs-cnt-item df-around"
            v-for="region in regionLib"
            :key="region"
          >
            <span
              :class="['drowdown-item bdrs-sm', { active: item === city }]"
              v-for="item in cityFilter(region)"
              :key="item"
              v-text="cityName(item)"
              @click="setCity(item)"
            ></span>
          </li>
        </ul>
        <div class="tabs-ctl df-around">
          <label for="tabs1" class="tabs-ctl-item">北部</label>
          <label for="tabs2" class="tabs-ctl-item">中部</label>
          <label for="tabs3" class="tabs-ctl-item">南部</label>
          <label for="tabs4" class="tabs-ctl-item">東部&離島</label>
        </div>
      </div>
      <hr class="drowdown-hr" />
      <h3 class="fz-md drowdown-title">選擇類型</h3>
      <div class="drowdown-mode df-around">
        <span
          :class="[
            'drowdown-item bdrs-sm',
            { active: searchMode === 'ScenicSpot' },
          ]"
          @click="searchMode = 'ScenicSpot'"
        >
          景點
        </span>
        <span
          :class="[
            'drowdown-item bdrs-sm',
            { active: searchMode === 'Restaurant' },
          ]"
          @click="searchMode = 'Restaurant'"
        >
          餐飲
        </span>
        <span
          :class="['drowdown-item bdrs-sm', { active: searchMode === 'Hotel' }]"
          @click="searchMode = 'Hotel'"
        >
          旅宿
        </span>
        <span
          :class="[
            'drowdown-item bdrs-sm',
            { active: searchMode === 'Activity' },
          ]"
          @click="searchMode = 'Activity'"
        >
          活動
        </span>
      </div>
      <hr class="drowdown-hr" />
      <h3 class="fz-md drowdown-title">搜尋模式</h3>
      <div class="drowdown-mode df-around">
        <span>模糊</span>
        <div>
          <input
            type="checkbox"
            id="switch"
            class="drowdown-swtich"
            v-model="searchStrict"
          />
          <label for="switch" class="drowdown-swtich-btn"></label>
        </div>
        <span>精準</span>
      </div>
      <button class="drowdown-btn fz-sm bdrs-sm" @click="openCity = !openCity">
        OK!
      </button>
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
    <button class="searchBtn fz-md bdrs-sm" @click="goSearch()">
      <i class="ico-search-1"></i>
      <span> 開始搜尋</span>
    </button>
    <h3 class="fz-md">精選主題</h3>
    <ul class="theme df-around">
      <li
        class="theme-item bdrs-sm"
        v-for="item in themeLib"
        :key="item.id"
        @click="goSearch('ScenicSpot', false, item.keywords)"
      >
        <img
          :src="require(`../assets/images/theme_${item.id}.png`)"
          :alt="item.name"
          class="theme-img"
          v-if="themeLib.length > 0"
        />
        <h4 class="theme-text df-center fz-sm" v-text="item.name"></h4>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { regionLib, cityLib, themeLib, modeLib } from "../lib.js";

export default {
  name: "Header",
  props: { city: String },
  emits: ["closeHeader", "setCity"],
  setup(props, { emit }) {
    // click 觸發父層 emit 事件
    const closeHeader = () => emit("closeHeader");
    const setCity = (item) => emit("setCity", item);
    // 透過索引篩選符合的縣市
    const cityFilter = (region) =>
      Object.keys(cityLib).filter((item) => cityLib[item].region === region);
    const cityName = (city) => cityLib[city].name;
    const modeName = computed(() => modeLib[searchMode.value]);
    const strictName = computed(() =>
      searchStrict.value ? "精準搜尋" : "模糊搜尋"
    );
    const openCity = ref(false);
    const keyword = ref("");
    const searchMode = ref("ScenicSpot");
    const searchStrict = ref(true);
    const router = useRouter();
    const goSearch = (
      mode = searchMode.value,
      strict = searchStrict.value,
      key = keyword.value.split(" ").join()
    ) => {
      const s = strict ? "T" : "F";
      router.replace({
        name: "Search",
        params: { mode: mode, strict: s, city: props.city, keyword: key },
      });
      closeHeader();
    };

    return {
      regionLib,
      themeLib,
      closeHeader,
      setCity,
      cityFilter,
      cityName,
      modeName,
      strictName,
      openCity,
      keyword,
      searchMode,
      searchStrict,
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
  margin: 1rem 0;
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
  margin-top: 1.5rem;
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
  transition: top 0.5s;
  &.show {
    top: 168px;
    transition: top 0.5s, box-shadow 0.5s 0.5s;
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
    padding: 0.3rem 1.2rem;
    border: 1px solid $c_main;
    transition: color 0.5s, background-color 0.5s;
    cursor: pointer;
    &:hover,
    &.active {
      color: $c_light;
      background-color: $c_main;
    }
  }
  &-mode {
    width: 100%;
    > span {
      margin: 0.3rem 0 0.8rem;
      padding: 0.2rem 0.8rem;
    }
  }
  &-swtich {
    display: none;
    &:checked + label {
      background: $c_main;
      &:after {
        left: calc(100% - 3px);
        transform: translateX(-100%);
      }
    }
  }
  &-swtich-btn {
    position: relative;
    display: block;
    width: 4rem;
    height: 2rem;
    background: $c_secondary-dark;
    border-radius: 0.5rem;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: calc(2rem - 6px);
      height: calc(2rem - 6px);
      background: $c_light;
      border-radius: 0.5rem;
      transition: 0.3s;
    }
  }
  &-btn {
    margin-top: 1rem;
    margin-left: auto;
    color: $c_light;
    padding: 0.5rem 2rem 0.4rem;
    background-color: $c_main;
    border: none;
    outline: none;
    cursor: pointer;
  }
  &-hr {
    width: 100%;
    margin: 0;
    border: 1px solid $c_secondary;
  }
}
.tabs {
  position: relative;
  width: 100%;
  height: 190px;
  overflow: hidden;
  &-radio {
    @for $i from 1 through 4 {
      &:nth-child(#{$i}):checked ~ .tabs-cnt {
        transform: translateX(($i - 1) * -100%);
      }
      &:nth-child(#{$i}):checked ~ .tabs-ctl > .tabs-ctl-item:nth-child(#{$i}) {
        border-bottom-color: $c_main;
        &::after {
          content: "地區";
        }
      }
    }
  }
  &-cnt {
    position: absolute;
    top: 0;
    width: inherit;
    transition: transform 0.5s;
  }
  &-cnt-item {
    position: absolute;
    justify-content: start;
    width: inherit;
    padding-top: 3rem;
    background-color: $c_light;
    @for $i from 1 through 5 {
      &:nth-of-type(#{$i}) {
        left: ($i - 1) * 100%;
      }
    }
  }
  &-ctl {
    position: absolute;
    top: 0.5rem;
    left: 0;
    right: 0;
    &-item {
      border-bottom: 3px solid transparent;
      cursor: pointer;
    }
  }
}
.searchBtn {
  display: block;
  width: 100%;
  margin: 0;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  color: $c_light;
  background-color: $c_main;
  border: none;
  outline: none;
  cursor: pointer;
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

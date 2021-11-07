<template>
  <div class="header">
    <div class="df-between header-main">
      <a href="/" class="header-logo"></a>
      <button class="header-btn" @click="closeHeader">
        <i class="ico-rounded-left"></i>
      </button>
    </div>
    <div class="select df-center" @click="openCity = !openCity">
      <span class="select-input" v-text="cityName"></span>
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
        :class="['drowdown-item bdrs-sm', { active: key === city }]"
        v-for="(item, key) in cityN"
        :key="key"
        v-text="item"
        @click="setCity(key)"
      ></span>
      <h3 class="fz-md drowdown-title">中部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: key === city }]"
        v-for="(item, key) in cityC"
        :key="key"
        v-text="item"
        @click="setCity(key)"
      ></span>
      <h3 class="fz-md drowdown-title">南部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: key === city }]"
        v-for="(item, key) in cityS"
        :key="key"
        v-text="item"
        @click="setCity(key)"
      ></span>
      <h3 class="fz-md drowdown-title">東部地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: key === city }]"
        v-for="(item, key) in cityE"
        :key="key"
        v-text="item"
        @click="setCity(key)"
      ></span>
      <h3 class="fz-md drowdown-title">離島地區</h3>
      <span
        :class="['drowdown-item bdrs-sm', { active: key === city }]"
        v-for="(item, key) in cityO"
        :key="key"
        v-text="item"
        @click="setCity(key)"
      ></span>
    </div>

    <div class="textbox df-center">
      <input type="text" class="textbox-input" placeholder="搜尋關鍵字" />
      <button class="textbox-btn"><i class="ico-search-1"></i></button>
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
import { computed, ref } from "@vue/reactivity";
export default {
  name: "App",
  props: {
    closeHeader: Function,
    city: String,
    setCity: Function,
  },
  setup(props) {
    const cityN = {
      Taipei: "台北",
      NewTaipei: "新北",
      Keelung: "基隆",
      Taoyuan: "桃園",
      Hsinchu: "竹市",
      HsinchuCounty: "竹縣",
      YilanCounty: "宜蘭",
    };
    const cityC = {
      MiaoliCounty: "苗栗",
      Taichung: "台中",
      ChanghuaCounty: "彰化",
      NantouCounty: "南投",
      YunlinCounty: "雲林",
    };
    const cityS = {
      Chiayi: "嘉市",
      ChiayiCounty: "嘉縣",
      Tainan: "台南",
      Kaohsiung: "高雄",
      PingtungCounty: "屏東",
      PenghuCounty: "澎湖",
    };
    const cityE = {
      HualienCounty: "花蓮",
      TaitungCounty: "臺東",
    };
    const cityO = {
      KinmenCounty: "金門",
      LienchiangCounty: "連江",
    };
    const cityMap = {
      Taiwan: "臺灣",
      ...cityN,
      ...cityC,
      ...cityS,
      ...cityE,
      ...cityO,
    };
    const cityName = computed(() => cityMap[props.city]);
    const openCity = ref(false);

    return { cityN, cityC, cityS, cityE, cityO, cityName, openCity };
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
.hr {
  margin: 0;
  border: 1px solid $c_secondary;
}
.featured {
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

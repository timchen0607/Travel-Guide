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
      <input
        type="text"
        class="textbox-input"
        placeholder="多筆關鍵字用 空格 格開"
        v-model="keyword"
        @keypress.enter="goSearch('', keyword.split(' ').join())"
      />
      <button
        class="textbox-btn"
        @click="goSearch('', keyword.split(' ').join())"
      >
        <i class="ico-search-1"></i>
      </button>
    </div>
    <hr class="hr" />
    <h3 class="fz-md">精選主題</h3>
    <ul class="theme df-around">
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('ScenicSpot', '文化,古蹟')"
      >
        <img
          src="../assets/images/theme_1.png"
          alt="文化古蹟"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">文化古蹟</h4>
      </div>
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('ScenicSpot', '自然,生態')"
      >
        <img
          src="../assets/images/theme_2.png"
          alt="自然生態"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">自然生態</h4>
      </div>
      <div
        class="theme-item bdrs-sm"
        @click="goSearch('Restaurant', '夜市小吃')"
      >
        <img
          src="../assets/images/theme_3.png"
          alt="夜市小吃"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">夜市小吃</h4>
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
        @click="goSearch('Activity', '藝文,遊憩')"
      >
        <img
          src="../assets/images/theme_8.png"
          alt="藝文遊憩"
          class="theme-img"
        />
        <h4 class="theme-text df-center fz-sm">藝文遊憩</h4>
      </div>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "App",
  props: {
    closeHeader: Function,
    setMode: Function,
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
    const keyword = ref("");
    const router = useRouter();
    const goSearch = (mode, key) => {
      if (mode) props.setMode(mode);
      router.push({
        name: "Search",
        params: { city: props.city, page: 1, keyword: key },
      });
      props.closeHeader();
    };

    return {
      cityN,
      cityC,
      cityS,
      cityE,
      cityO,
      cityName,
      openCity,
      keyword,
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

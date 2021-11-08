<template>
  <div class="home">
    <div class="banner shadow">
      <h1 class="banner-text">探索。<br />福爾摩沙</h1>
    </div>
    <h2 class="fz-md c-sce"><i class="ico-beach"></i> 熱門景點</h2>
    <div class="hot">
      <div
        class="hot-city bdrs-sm"
        v-for="(item, idx) in ranCity"
        :key="item.key"
        @click="goSearch('ScenicSpot', item.key)"
      >
        <img class="hot-city-img" :src="getImgUrl(idx + 1)" :alt="item.key" />
        <div class="hot-city-content fz-xl">
          <i :class="`hot-city-icon icoTW-${item.icon}`"></i>
          <span v-text="item.name"></span>
        </div>
      </div>
    </div>
    <h2 class="fz-md c-res"><i class="ico-restaurant"></i> 品嚐美食</h2>
    <h2 class="fz-md c-htl"><i class="ico-hotel"></i> 住宿推薦</h2>
    <h2 class="fz-md c-act"><i class="ico-flag-alt-2"></i> 觀光活動</h2>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { dataFilter } from "../modules.js";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const ranCity = ref([]);
    const cityLib = [
      { key: "Taipei", name: "台北", icon: "postbox2" },
      { key: "NewTaipei", name: "新北", icon: "queens-head" },
      { key: "Keelung", name: "基隆", icon: "green-man" },
      { key: "Taoyuan", name: "桃園", icon: "slipper" },
      { key: "Hsinchu", name: "竹市", icon: "green-man" },
      { key: "HsinchuCounty", name: "竹縣", icon: "red-man" },
      { key: "YilanCounty", name: "宜蘭", icon: "ly-mus" },
      { key: "MiaoliCounty", name: "苗栗", icon: "longteng-brg" },
      { key: "Taichung", name: "台中", icon: "taichung-park" },
      { key: "ChanghuaCounty", name: "彰化", icon: "bagua" },
      { key: "NantouCounty", name: "南投", icon: "black-bear" },
      { key: "YunlinCounty", name: "雲林", icon: "fortune" },
      { key: "Chiayi", name: "嘉市", icon: "taiwanese-bag" },
      { key: "ChiayiCounty", name: "嘉縣", icon: "tea-pot" },
      { key: "Tainan", name: "台南", icon: "provintia" },
      { key: "Kaohsiung", name: "高雄", icon: "dt-pagoda" },
      { key: "PingtungCounty", name: "屏東", icon: "vase-rock" },
      { key: "PenghuCounty", name: "澎湖", icon: "penghu-islands" },
      { key: "HualienCounty", name: "花蓮", icon: "balloon" },
      { key: "TaitungCounty", name: "臺東", icon: "flying-fish" },
      { key: "KinmenCounty", name: "金門", icon: "kinmen-island" },
      { key: "LienchiangCounty", name: "連江", icon: "jug" },
    ];
    const getImgUrl = (pic) => require("../assets/images/city_" + pic + ".jpg");
    const router = useRouter();
    const goSearch = (mode, city) =>
      router.replace({
        name: "Search",
        params: { mode: mode, city: city, page: 1 },
      });

    onMounted(() => {
      document.title = "Travel Guide";
      ranCity.value = dataFilter(cityLib, 7);
    });

    return { ranCity, getImgUrl, goSearch };
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
  background: url(../assets/images/banner_Home.png) no-repeat bottom right /
      contain,
    $c_light;
  border-radius: 1rem;
  overflow: hidden;
  user-select: none;
  &-text {
    position: absolute;
    top: 60%;
    left: 1em;
    font-size: min(4rem, 5vw);
    font-weight: bold;
    transform: translateY(-50%);
  }
}
.hot {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-wrap: wrap;
  height: min(300px, 40vw);
  overflow: hidden;
  @include mobile {
    height: auto;
    flex-direction: row;
  }
  &-city {
    position: relative;
    width: calc(20% - 0.6rem);
    height: calc(50% - 0.6rem);
    margin: 0.3rem;
    overflow: hidden;
    cursor: pointer;
    @include mobile {
      width: calc(50% - 0.6rem);
      height: 150px;
    }
    &:nth-child(3n + 1) {
      height: 100%;
      @include mobile {
        width: 100%;
        height: 130px;
      }
    }
    &:hover {
      .hot-city-img {
        transform: scale(1.3);
      }
      .hot-city-content {
        background-color: #00000066;
      }
    }
    &-img {
      width: 100%;
      height: 100%;
      object-position: center left;
      object-fit: cover;
      transition: transform 0.5s;
    }
    &-content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: $c_light;
      background-color: #00000019;
      transition: background-color 0.5s;
    }
    &-icon {
      font-size: 4rem;
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="banner shadow">
      <h1 class="banner-text">
        <span v-text="ranSlogan[0]"></span><br />
        <span v-text="ranSlogan[1]"></span>
      </h1>
    </div>
    <h2 class="fz-md c-sce"><i class="ico-beach"></i> 熱門景點</h2>
    <div class="hot">
      <router-link
        class="hot-city bdrs-sm"
        v-for="(item, idx) in ranCity"
        :key="item[0]"
        :to="`/ScenicSpot/${item[0]}/`"
      >
        <img class="hot-city-img" :src="getImgUrl(idx + 1)" :alt="item[0]" />
        <div class="hot-city-content fz-xl">
          <i :class="`hot-city-icon icoTW-${item[1].icon}`"></i>
          <span v-text="item[1].name"></span>
        </div>
      </router-link>
    </div>
    <h2 class="fz-md c-res"><i class="ico-restaurant"></i> 打卡美食</h2>
    <Recommend recMode="Restaurant" :page="ranPage" amount="3" />
    <h2 class="fz-md c-htl"><i class="ico-hotel"></i> 住宿推薦</h2>
    <Recommend recMode="Hotel" :page="ranPage" amount="4" />
    <h2 class="fz-md c-act"><i class="ico-flag-alt-2"></i> 觀光活動</h2>
    <Recommend recMode="Activity" :page="ranPage2" amount="8" />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { dataFilter } from "../modules.js";
import { cityLib, sloganLib } from "../lib.js";
import Recommend from "../components/Recommend.vue";

export default {
  name: "Home",
  components: { Recommend },
  setup() {
    const ranSlogan = ref([]);
    const ranCity = ref([]);
    const ranPage = Math.floor(Math.random() * 100) + 1;
    const ranPage2 = Math.floor(Math.random() * 10) + 1;
    const getImgUrl = (pic) => require("../assets/images/city_" + pic + ".jpg");

    onMounted(() => {
      document.title = "Travel Guide";
      dataFilter(sloganLib, 1).then((res) => (ranSlogan.value = res[0]));
      dataFilter(Object.entries(cityLib), 7).then(
        (res) => (ranCity.value = res)
      );
    });

    return { ranSlogan, ranCity, ranPage, ranPage2, getImgUrl };
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

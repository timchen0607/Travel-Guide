<template>
  <div class="search">
    <div class="banner shadow">
      <img
        class="banner-img"
        :src="getImgUrl(mode)"
        alt="Travel Guide"
        title="Travel Guide"
      />
      <h1 class="banner-text">
        <span
          v-if="params.keyword"
          v-text="params.keyword.split(',').join(' ')"
        ></span>
        <span v-else v-text="params.city.replace(/[A-Z]/g, '\ $&')"></span>
      </h1>
    </div>
    <div class="mode">
      <router-link
        :to="`/ScenicSpot/${params.city}/${params.keyword || ''}`"
        :class="['mode-btn bdrs-sm', { active: mode === 'ScenicSpot' }]"
        replace
      >
        景點
      </router-link>
      <router-link
        :to="`/Restaurant/${params.city}/${params.keyword || ''}`"
        :class="['mode-btn bdrs-sm', { active: mode === 'Restaurant' }]"
        replace
      >
        餐飲
      </router-link>
      <router-link
        :to="`/Hotel/${params.city}/${params.keyword || ''}`"
        :class="['mode-btn bdrs-sm', { active: mode === 'Hotel' }]"
        replace
      >
        旅宿
      </router-link>
      <router-link
        :to="`/Activity/${params.city}/${params.keyword || ''}`"
        :class="['mode-btn bdrs-sm', { active: mode === 'Activity' }]"
        replace
      >
        活動
      </router-link>
    </div>
    <div :class="'card-' + mode">
      <router-link
        :to="`/D/${item.ID}/`"
        class="card bdrs-sm"
        v-for="item in result"
        :key="item.ID"
      >
        <div class="card-box">
          <img
            class="card-img"
            :src="item.Picture.PictureUrl1"
            :alt="item.Picture.PictureDescription1 || item.Name"
            onerror="this.style.display='none'"
          />
        </div>
        <div class="card-content">
          <h2 class="card-title" v-text="item.Name"></h2>
          <p class="card-text" v-if="item.Date">
            <i class="ico-calendar"></i>
            <span v-text="' ' + item.Date"></span>
          </p>
          <p class="card-text" v-if="!item.Date && item.StartTime">
            <i class="ico-calendar"></i>
            <span v-text="' ' + item.StartTime + ' ~ '"></span>
            <span v-text="item.EndTime"></span>
          </p>
          <p class="card-text" v-if="item.OpenTime">
            <i class="ico-clock-time"></i>
            <span v-text="' ' + item.OpenTime.split('；')[0]"></span>
          </p>
          <p class="card-text" v-if="item.TicketInfo">
            <i class="ico-ticket"></i>
            <span v-text="' ' + item.TicketInfo"></span>
          </p>
          <p class="card-text" v-if="item.Address">
            <i class="ico-location-pin"></i>
            <span v-text="' ' + item.Location" v-if="item.Location"></span>
            <span v-text="' ' + item.Address"></span>
          </p>
          <p
            class="card-text"
            v-if="item.Class || item.Class1 || item.Class2 || item.Class3"
          >
            <i class="ico-tags"></i>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class"
              v-if="item.Class"
            ></span>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class1"
              v-if="item.Class1"
            ></span>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class2"
              v-if="item.Class2"
            ></span>
            <span
              class="card-tag bdrs-sm"
              v-text="item.Class3"
              v-if="item.Class3"
            ></span>
          </p>
        </div>
      </router-link>
    </div>
    <button class="loadBtn fz-md bdrs-sm" @click="loadData" v-if="loadBtn">
      載入更多
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getTravelInfo, getNearbyInfo } from "../modules.js";

export default {
  name: "Search",
  props: {
    mode: String,
    setMode: Function,
  },
  setup(props) {
    const getImgUrl = (pic) =>
      require("../assets/images/banner_" + pic + ".png");
    const route = useRoute();
    const params = computed(() => route.params);
    const result = ref([]);
    const type = computed(() => (params.value.city ? "Search" : "Nearby"));
    const pageIdx = ref(1);
    const loadData = () => {
      if (!params.value.mode) return;
      if (type.value === "Search") {
        const { mode, city, keyword } = params.value;
        props.setMode(mode);
        getTravelInfo(mode, city, pageIdx.value, keyword).then((res) => {
          if (res.length < 18) loadBtn.value = false;
          res.forEach((item) => {
            if (item.StartTime) item.StartTime = item.StartTime.split("T")[0];
            if (item.EndTime) item.EndTime = item.EndTime.split("T")[0];
            if (item.StartTime === item.EndTime) item.Date = item.EndTime;
          });
          result.value.push(...res);
        });
      }
      if (type.value === "Nearby") {
        const { mode, lat, lon } = params.value;
        props.setMode(mode);
        getNearbyInfo(mode, lat, lon, pageIdx.value).then(
          (res) => (result.value = { ...result.value, ...res })
        );
      }
      pageIdx.value += 1;
    };
    const loadBtn = ref(true);

    onMounted(() => loadData());
    watch(
      () => params.value,
      () => {
        pageIdx.value = 1;
        result.value = [];
        loadData();
      }
    );

    return { getImgUrl, params, result, loadData, loadBtn };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.search {
  padding: min(2rem, 4vw);
}
.banner {
  position: relative;
  width: 100%;
  height: min(300px, 40vw);
  background-color: $c_light;
  border-radius: 1rem;
  overflow: hidden;
  &-img {
    width: 100%;
    height: 100%;
    object-position: center left;
    object-fit: cover;
  }
  &-text {
    position: absolute;
    top: 70%;
    left: 1em;
    color: $c_light;
    font-size: min(4rem, 5vw);
    font-weight: bold;
    text-shadow: 0 0 1rem #00000099;
    transform: translateY(-50%);
  }
}
.mode {
  margin: 1.5rem 0;
  @include pad {
    text-align: center;
  }
  &-btn {
    display: inline-block;
    margin: 0 min(0.5rem, 1.5vw);
    padding: 0.3rem 0.8rem;
    color: $c_main;
    border: 1px solid $c_main;
    text-decoration: none;
    cursor: pointer;
    &.active {
      color: $c_light;
      background-color: $c_main;
    }
  }
}
.loadBtn {
  display: block;
  margin: 0 auto;
  padding: 0.5rem 4rem;
  color: $c_main;
  border: none;
  outline: none;
  transition: color 0.5s, background-color 0.5s;
  cursor: pointer;
  &:hover {
    color: $c_light;
    background-color: $c_main;
  }
}
</style>

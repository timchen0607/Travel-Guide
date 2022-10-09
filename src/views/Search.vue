<template>
  <div class="search" v-if="loading === 1">
    <div class="banner boxShadow">
      <img
        class="banner-img"
        :src="getUrl()"
        alt="Travel Guide"
        title="Travel Guide"
      />
      <h1 class="banner-text" v-text="getTitle()"></h1>
    </div>
    <div class="mode">
      <router-link
        :to="getLink('ScenicSpot')"
        :class="['mode-btn bdrs-sm', { active: mode === 'ScenicSpot' }]"
        replace
      >
        景點
      </router-link>
      <router-link
        :to="getLink('Restaurant')"
        :class="['mode-btn bdrs-sm', { active: mode === 'Restaurant' }]"
        replace
      >
        餐飲
      </router-link>
      <router-link
        :to="getLink('Hotel')"
        :class="['mode-btn bdrs-sm', { active: mode === 'Hotel' }]"
        replace
      >
        旅宿
      </router-link>
      <router-link
        :to="getLink('Activity')"
        :class="['mode-btn bdrs-sm', { active: mode === 'Activity' }]"
        replace
      >
        活動
      </router-link>
    </div>
    <div :class="'card-' + mode">
      <router-link
        :to="`/D/${item[mode + 'ID']}/`"
        class="card bdrs-sm"
        v-for="item in result"
        :key="item.ID"
      >
        <div class="card-box">
          <img
            class="card-img"
            :src="item.Picture.PictureUrl1"
            :alt="item.Picture.PictureDescription1 || item[mode + 'Name']"
            onerror="this.style.display='none'"
          />
        </div>
        <div class="card-content">
          <h2 class="card-title" v-text="item[mode + 'Name']"></h2>
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
    <button
      :class="['loadBtn fz-md bdrs-sm', { hide: loadBtn }]"
      @click="loadData"
    >
      載入更多
    </button>
  </div>
  <div class="search" v-if="loading === 0">
    <div class="banner boxShadow">
      <img
        class="banner-loading"
        src="../assets/images/banner_Home.png"
        alt="Travel Guide"
        title="Travel Guide"
      />
    </div>
    <div class="mode"></div>
    <Loading :loadMode="mode" :amount="parseInt(6)" />
  </div>
  <div class="search" v-if="loading === -1">
    <div class="banner boxShadow">
      <img
        class="banner-img"
        :src="getUrl()"
        alt="Travel Guide"
        title="Travel Guide"
      />
    </div>
    <div class="mode">
      <router-link
        :to="getLink('ScenicSpot')"
        :class="['mode-btn bdrs-sm', { active: mode === 'ScenicSpot' }]"
        replace
      >
        景點
      </router-link>
      <router-link
        :to="getLink('Restaurant')"
        :class="['mode-btn bdrs-sm', { active: mode === 'Restaurant' }]"
        replace
      >
        餐飲
      </router-link>
      <router-link
        :to="getLink('Hotel')"
        :class="['mode-btn bdrs-sm', { active: mode === 'Hotel' }]"
        replace
      >
        旅宿
      </router-link>
      <router-link
        :to="getLink('Activity')"
        :class="['mode-btn bdrs-sm', { active: mode === 'Activity' }]"
        replace
      >
        活動
      </router-link>
    </div>
    <Error />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { getTravelInfo, getNearbyInfo, dataRegular } from "../api.js";
import { cityLib, modeLib } from "../lib.js";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";

export default {
  name: "Search",
  props: { mode: String, city: String },
  components: { Loading, Error },
  emits: ["setMode"],
  setup(props, { emit }) {
    const loading = ref(0);
    const route = useRoute();
    const router = useRouter();
    const parm = route.params;
    let pageIdx = 1;
    const result = ref([]);
    const loadBtn = ref(true);
    const verify = () => {
      if (parm.strict && parm.strict !== "T" && parm.strict !== "F")
        return true;
      if (Object.keys(modeLib).indexOf(parm.mode) < 0) return true;
      if (parm.city && !cityLib[parm.city]) return true;
      return false;
    };
    const loadData = () => {
      if (verify()) router.replace({ name: "Home" });
      loadBtn.value = true;
      emit("setMode", parm.mode);
      const strict = parm.strict === "T";
      const load = parm.city
        ? getTravelInfo(parm.mode, parm.city, pageIdx, parm.keyword, strict)
        : getNearbyInfo(parm.mode, parm.lat, parm.lon, pageIdx);
      load
        .then((res) => {
          if (res.length === 0) throw new Error();
          if (res.length === 18) loadBtn.value = false;
          return dataRegular(res);
        })
        .then((data) => {
          result.value.push(...data);
          pageIdx += 1;
          setTimeout(() => (loading.value = 1), 500);
          if (pageIdx === 2) window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(() => (loading.value = -1));
    };
    const getTitle = () => {
      if (parm.keyword) return parm.keyword.split(",").join(" ");
      else if (parm.city) return parm.city.replace(/[A-Z]/g, " $&");
      else return parm.mode;
    };
    const getUrl = () => require(`../assets/images/banner_${props.mode}.png`);
    const getLink = (mode) =>
      parm.city
        ? `/${mode}/${parm.strict}/${parm.city}/${parm.keyword || ""}`
        : `/${mode}/${parm.lat}/${parm.lon}`;

    onMounted(() => loadData());

    return {
      loading,
      result,
      loadData,
      loadBtn,
      getTitle,
      getUrl,
      getLink,
    };
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
  &-loading {
    width: 100%;
    height: 100%;
    object-position: center right;
    object-fit: contain;
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
  &.hide {
    opacity: 0;
  }
  &:hover {
    color: $c_light;
    background-color: $c_main;
  }
}
</style>

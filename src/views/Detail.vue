<template>
  <div class="detail" v-if="loading === 1">
    <div class="detail-title df-between">
      <div
        class="df-between"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')"
      >
        <button class="detail-btn">
          <i class="ico-rounded-left"></i>
        </button>
        <h1 class="fz-xxl" v-text="result.Name"></h1>
      </div>
      <div>
        <button class="detail-btn" onclick="window.print()">
          <i class="ico-print"></i>
        </button>
      </div>
    </div>
    <Banner :pic="result.Picture" :name="result.Name" />
    <h2 class="fz-md c-main">
      <i class="ico-info-square"></i>
      <span v-text="' ' + result.modeName + '資訊'"></span>
    </h2>
    <div class="detail-info bdrs-sm">
      <p v-if="result.Date">
        <i class="ico-calendar"></i>
        <span> 活動日期：</span>
        <span v-text="result.Date"></span>
      </p>
      <p v-if="!result.Date && result.StartTime">
        <i class="ico-calendar"></i>
        <span> 活動期間：</span>
        <span v-text="result.StartTime + ' ~ '"></span>
        <span v-text="result.EndTime"></span>
      </p>
      <p v-if="result.OpenTime">
        <i class="ico-clock-time"></i>
        <span> 開放時段：</span>
        <span v-text="result.OpenTime"></span>
      </p>
      <p v-if="result.TicketInfo">
        <i class="ico-ticket"></i>
        <span> 門票費用：</span>
        <span v-text="result.TicketInfo"></span>
      </p>
      <p v-if="result.Address">
        <i class="ico-location-pin"></i>
        <span v-text="` ${result.modeName}地點：`"></span>
        <span v-text="`${result.Location} `" v-if="result.Location"></span>
        <span v-text="result.Address"></span>
      </p>
      <p v-if="result.Phone">
        <i class="ico-ui-touch-phone"></i>
        <span> 聯絡電話：</span>
        <a :href="`tel:${result.Phone}`" v-text="result.Phone"></a>
      </p>
      <p v-if="result.WebsiteUrl">
        <i class="ico-earth"></i>
        <span> 官方網站：</span>
        <a :href="result.WebsiteUrl" target="_blank">點我前往</a>
      </p>
      <p v-if="result.Organizer">
        <i class="ico-people"></i>
        <span> 主辦單位：</span>
        <span v-text="result.Organizer"></span>
      </p>
      <p v-if="result.Cycle">
        <i class="ico-ui-text-chat"></i>
        <span> 備註說明：</span>
        <span v-text="result.Cycle"></span>
      </p>
      <p v-if="result.Class || result.Class1 || result.Class2 || result.Class3">
        <i class="ico-tags"></i>
        <span v-text="` ${result.modeName}標籤：`"></span>
        <router-link
          :to="`/${mode}/${city}/${result.Class}/`"
          class="detail-tag bdrs-sm"
          v-text="result.Class"
          v-if="result.Class"
        ></router-link>
        <router-link
          :to="`/${mode}/${city}/${result.Class1}/`"
          class="detail-tag bdrs-sm"
          v-text="result.Class1"
          v-if="result.Class1"
        ></router-link>
        <router-link
          :to="`/${mode}/${city}/${result.Class2}/`"
          class="detail-tag bdrs-sm"
          v-text="result.Class2"
          v-if="result.Class2"
        ></router-link>
        <router-link
          :to="`/${mode}/${city}/${result.Class3}/`"
          class="detail-tag bdrs-sm"
          v-text="result.Class3"
          v-if="result.Class3"
        ></router-link>
      </p>
    </div>
    <h2 class="fz-md c-main">
      <i class="ico-google-talk"></i>
      <span v-text="' ' + result.modeName + '介紹'"></span>
    </h2>
    <pre
      class="detail-pre"
      v-text="result.DescriptionDetail || result.Description"
    ></pre>
    <h2 class="fz-md c-main"><i class="ico-bus"></i> 交通方式</h2>
    <pre class="detail-pre" v-text="result.TravelInfo"></pre>
    <pre class="detail-pre" v-text="result.ParkingInfo"></pre>
    <div class="bdrs-sm">
      <iframe
        width="100%"
        height="250"
        loading="lazy"
        v-if="mode === 'Activity'"
        :src="`https://maps.google.com/maps?q=${result.Position.PositionLat},${result.Position.PositionLon}&hl=zh-TW&z=16&amp;output=embed`"
      >
      </iframe>
      <iframe
        width="100%"
        height="250"
        loading="lazy"
        v-else
        :src="`https://maps.google.com/maps?q=${result.Name.split('').join(
          '+'
        )}&hl=zh-TW&z=16&amp;output=embed`"
      >
      </iframe>
    </div>
    <div class="space"></div>
    <div class="df-between c-sce">
      <h2 class="fz-md"><i class="ico-beach"></i> 查看鄰近的景點</h2>
      <router-link
        :to="`/ScenicSpot/${result.Position.PositionLat}/${result.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="ScenicSpot"
      :lat="result.Position.PositionLat"
      :lon="result.Position.PositionLon"
      :page="parseInt(1)"
      amount="3"
    />
    <div class="df-between c-res">
      <h2 class="fz-md"><i class="ico-restaurant"></i> 查看鄰近的餐飲</h2>
      <router-link
        :to="`/Restaurant/${result.Position.PositionLat}/${result.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="Restaurant"
      :lat="result.Position.PositionLat"
      :lon="result.Position.PositionLon"
      :page="parseInt(1)"
      amount="3"
    />
    <div class="df-between c-htl">
      <h2 class="fz-md"><i class="ico-hotel"></i> 查看鄰近的旅宿</h2>
      <router-link
        :to="`/Hotel/${result.Position.PositionLat}/${result.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="Hotel"
      :lat="result.Position.PositionLat"
      :lon="result.Position.PositionLon"
      :page="parseInt(1)"
      amount="2"
    />
    <div class="df-between c-act">
      <h2 class="fz-md"><i class="ico-flag-alt-2"></i> 查看鄰近的活動</h2>
      <router-link
        :to="`/Activity/${result.Position.PositionLat}/${result.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="Activity"
      :lat="result.Position.PositionLat"
      :lon="result.Position.PositionLon"
      :page="parseInt(1)"
      amount="4"
    />
  </div>

  <div class="detail" v-if="loading <= 0">
    <Error v-if="loading === -1" />
    <div class="loading-title bdrs-sm"></div>
    <div class="loading-box bdrs-xl"></div>
    <div class="loading-title bdrs-sm"></div>
    <div class="loading-text bdrs-sm"></div>
    <div class="loading-text bdrs-sm"></div>
    <div class="loading-text bdrs-sm"></div>
    <div class="loading-title bdrs-sm"></div>
    <div class="loading-text bdrs-sm"></div>
    <div class="loading-text bdrs-sm"></div>
    <div class="loading-text bdrs-sm"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { getDetail, getMode } from "../modules.js";
import Banner from "../components/Banner.vue";
import Recommend from "../components/Recommend.vue";
import Error from "../components/Error.vue";

export default {
  name: "Detail",
  props: { mode: String, setMode: Function, city: String },
  components: { Banner, Recommend, Error },
  setup(props) {
    const loading = ref(0);
    const hasHistory = () => window.history.length > 2;
    const route = useRoute();
    const router = useRouter();
    const result = ref(null);
    const loadData = () => {
      if (!route.params.ID) router.replace({ name: "Home" });
      getDetail(route.params.ID)
        .then((data) => {
          if (!data.ID) throw new Error();
          result.value = data;
          props.setMode(getMode(result.value.ID, true));
          document.title = result.value.Name + " - Travel Guide";
          loading.value = 1;
        })
        .catch(() => (loading.value = -1));
    };

    onMounted(() => loadData());

    return { loading, hasHistory, result };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.detail {
  padding: min(2rem, 4vw);
  &-title {
    justify-content: flex-end;
    > *:nth-child(1) {
      margin-right: auto;
    }
  }
  &-btn {
    margin: 0 min(0.5rem, 1vw);
    padding: 0.3rem 0.5rem;
    font-size: 1.5rem;
    color: $c_main;
    background-color: transparent;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;
    &:hover {
      color: $c_light;
      background-color: $c_main;
    }
  }
  &-info {
    padding: min(1rem, 3vw);
    background: linear-gradient(to right, #ffffffdd, #ffffffdd), $c_main;
    > p {
      margin-left: 6.2em;
      padding-bottom: 0.5rem;
      text-indent: -6.2em;
    }
  }
  &-pre {
    padding: 0 min(1rem, 3vw);
    text-align: justify;
    white-space: pre-line;
  }
  &-tag {
    margin: 0 0.3rem;
    padding: 0.2rem 0.5rem 0.3rem;
    line-height: 3rem;
    color: $c_dark;
    background-color: $c_main;
    white-space: nowrap;
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      color: $c_light;
    }
  }
  &-more {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.space {
  position: relative;
  margin: 3rem auto;
  width: 15px;
  height: 15px;
  background-color: $c_main;
  transform: rotate(45deg);
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 15px;
    height: 15px;
    background-color: $c_main;
    transform: translate(-50px, 50px);
  }
  &::after {
    transform: translate(50px, -50px);
  }
}
.loading {
  &-box {
    @include background;
    padding-top: 300px;
  }
  &-title {
    @include background;
    width: 40%;
    max-width: 500px;
    height: 3rem;
    margin: 1rem 0;
    animation-delay: 0.08s;
  }
  &-text {
    @include background;
    min-height: 1.5rem;
    margin-bottom: 0.5rem;
    animation-delay: 0.1s;
  }
}
</style>

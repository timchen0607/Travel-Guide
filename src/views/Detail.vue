<template>
  <div class="detail" v-if="dtl">
    <div class="detail-title df-between">
      <div
        class="df-between"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')"
      >
        <button class="detail-btn">
          <i class="ico-rounded-left"></i>
        </button>
        <h1 class="fz-xxl" v-text="dtl.Name"></h1>
      </div>
      <div>
        <button class="detail-btn" onclick="window.print()">
          <i class="ico-print"></i>
        </button>
      </div>
    </div>
    <Banner :pic="dtl.Picture" :name="dtl.Name" />
    <h2 class="fz-md c-main">
      <i class="ico-info-square"></i>
      <span v-text="' ' + dtl.modeName + '資訊'"></span>
    </h2>
    <div class="detail-info bdrs-sm">
      <p v-if="dtl.Date">
        <i class="ico-calendar"></i>
        <span> 活動日期：</span>
        <span v-text="dtl.Date"></span>
      </p>
      <p v-if="!dtl.Date && dtl.StartTime">
        <i class="ico-calendar"></i>
        <span> 活動期間：</span>
        <span v-text="dtl.StartTime + ' ~ '"></span>
        <span v-text="dtl.EndTime"></span>
      </p>
      <p v-if="dtl.OpenTime">
        <i class="ico-clock-time"></i>
        <span> 開放時段：</span>
        <span v-text="dtl.OpenTime"></span>
      </p>
      <p v-if="dtl.TicketInfo">
        <i class="ico-ticket"></i>
        <span> 門票費用：</span>
        <span v-text="dtl.TicketInfo"></span>
      </p>
      <p v-if="dtl.Address">
        <i class="ico-location-pin"></i>
        <span v-text="` ${dtl.modeName}地點：`"></span>
        <span v-text="`${dtl.Location} `" v-if="dtl.Location"></span>
        <span v-text="dtl.Address"></span>
      </p>
      <p v-if="dtl.Phone">
        <i class="ico-ui-touch-phone"></i>
        <span> 聯絡電話：</span>
        <a :href="`tel:${dtl.Phone}`" v-text="dtl.Phone"></a>
      </p>
      <p v-if="dtl.WebsiteUrl">
        <i class="ico-earth"></i>
        <span> 官方網站：</span>
        <a :href="dtl.WebsiteUrl" target="_blank">點我前往</a>
      </p>
      <p v-if="dtl.Organizer">
        <i class="ico-people"></i>
        <span> 主辦單位：</span>
        <span v-text="dtl.Organizer"></span>
      </p>
      <p v-if="dtl.Cycle">
        <i class="ico-ui-text-chat"></i>
        <span> 備註說明：</span>
        <span v-text="dtl.Cycle"></span>
      </p>
      <p v-if="dtl.Class || dtl.Class1 || dtl.Class2 || dtl.Class3">
        <i class="ico-tags"></i>
        <span v-text="` ${dtl.modeName}標籤：`"></span>
        <router-link
          :to="`/${mode}/${city}/${dtl.Class}/`"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class"
          v-if="dtl.Class"
        ></router-link>
        <router-link
          :to="`/${mode}/${city}/${dtl.Class1}/`"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class1"
          v-if="dtl.Class1"
        ></router-link>
        <router-link
          :to="`/${mode}/${city}/${dtl.Class2}/`"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class2"
          v-if="dtl.Class2"
        ></router-link>
        <router-link
          :to="`/${mode}/${city}/${dtl.Class3}/`"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class3"
          v-if="dtl.Class3"
        ></router-link>
      </p>
    </div>
    <h2 class="fz-md c-main">
      <i class="ico-google-talk"></i>
      <span v-text="' ' + dtl.modeName + '介紹'"></span>
    </h2>
    <pre
      class="detail-pre"
      v-text="dtl.DescriptionDetail || dtl.Description"
    ></pre>
    <h2 class="fz-md c-main"><i class="ico-bus"></i> 交通方式</h2>
    <pre class="detail-pre" v-text="dtl.TravelInfo"></pre>
    <pre class="detail-pre" v-text="dtl.ParkingInfo"></pre>
    <div class="bdrs-sm">
      <iframe
        width="100%"
        height="250"
        loading="lazy"
        v-if="mode === 'Activity'"
        :src="`https://maps.google.com/maps?q=${dtl.Position.PositionLat},${dtl.Position.PositionLon}&hl=zh-TW&z=16&amp;output=embed`"
      >
      </iframe>
      <iframe
        width="100%"
        height="250"
        loading="lazy"
        v-else
        :src="`https://maps.google.com/maps?q=${dtl.Name.split('').join(
          '+'
        )}&hl=zh-TW&z=16&amp;output=embed`"
      >
      </iframe>
    </div>
    <div class="space"></div>
    <div class="df-between c-sce">
      <h2 class="fz-md"><i class="ico-beach"></i> 查看鄰近的景點</h2>
      <router-link
        :to="`/ScenicSpot/${dtl.Position.PositionLat}/${dtl.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="ScenicSpot"
      :lat="dtl.Position.PositionLat"
      :lon="dtl.Position.PositionLon"
      :page="parseInt(1)"
      amount="3"
    />
    <div class="df-between c-res">
      <h2 class="fz-md"><i class="ico-restaurant"></i> 查看鄰近的餐飲</h2>
      <router-link
        :to="`/Restaurant/${dtl.Position.PositionLat}/${dtl.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="Restaurant"
      :lat="dtl.Position.PositionLat"
      :lon="dtl.Position.PositionLon"
      :page="parseInt(1)"
      amount="3"
    />
    <div class="df-between c-htl">
      <h2 class="fz-md"><i class="ico-hotel"></i> 查看鄰近的旅宿</h2>
      <router-link
        :to="`/Hotel/${dtl.Position.PositionLat}/${dtl.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="Hotel"
      :lat="dtl.Position.PositionLat"
      :lon="dtl.Position.PositionLon"
      :page="parseInt(1)"
      amount="2"
    />
    <div class="df-between c-act">
      <h2 class="fz-md"><i class="ico-flag-alt-2"></i> 查看鄰近的活動</h2>
      <router-link
        :to="`/Activity/${dtl.Position.PositionLat}/${dtl.Position.PositionLon}/`"
        class="detail-more"
      >
        More
      </router-link>
    </div>
    <Recommend
      recMode="Activity"
      :lat="dtl.Position.PositionLat"
      :lon="dtl.Position.PositionLon"
      :page="parseInt(1)"
      amount="4"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getDetail, getMode } from "../modules.js";
import Banner from "../components/Banner.vue";
import Recommend from "../components/Recommend.vue";

export default {
  name: "Detail",
  props: { mode: String, setMode: Function, city: String },
  components: { Banner, Recommend },
  setup(props) {
    const hasHistory = () => window.history.length > 2;
    const route = useRoute();
    const ID = computed(() => route.params.ID);
    const dtl = ref(null);
    const loadData = () => {
      if (!ID.value) return;
      window.scrollTo({ top: 0, behavior: "smooth" });
      getDetail(ID.value).then((res) => {
        res[0].modeName = ref(getMode(res[0].ID));
        if (res[0].Description)
          res[0].Description = res[0].Description.split("。").join("。\n\n");
        if (res[0].DescriptionDetail)
          res[0].DescriptionDetail =
            res[0].DescriptionDetail.split("。").join("。\n\n");
        if (res[0].TravelInfo)
          res[0].TravelInfo = res[0].TravelInfo.split("。").join("。\n\n");
        if (res[0].ParkingInfo)
          res[0].ParkingInfo = res[0].ParkingInfo + "\n\n";
        if (res[0].StartTime) res[0].StartTime = res[0].StartTime.split("T")[0];
        if (res[0].EndTime) res[0].EndTime = res[0].EndTime.split("T")[0];
        if (res[0].StartTime === res[0].EndTime) res[0].Date = res[0].EndTime;
        dtl.value = res[0];
        props.setMode(getMode(dtl.value.ID, true));
        document.title = dtl.value.Name + " - Travel Guide";
      });
    };
    onMounted(() => loadData());

    return { hasHistory, dtl, getMode };
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
</style>

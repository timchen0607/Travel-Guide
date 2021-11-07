<template>
  <div class="detail" v-if="dtl">
    <div class="detail-title df-between">
      <div class="df-between">
        <button class="detail-btn">
          <i class="ico-rounded-left"></i>
        </button>
        <h1 class="fz-xxl" v-text="dtl.Name"></h1>
      </div>
      <div>
        <button class="detail-btn"><i class="ico-heart"></i></button>
        <button class="detail-btn"><i class="ico-print"></i></button>
        <button class="detail-btn"><i class="ico-share"></i></button>
      </div>
    </div>
    <Banner :pic="dtl.Picture" :name="dtl.Name" />

    <h2 class="fz-md c-main">
      <i class="ico-info-square"></i>
      <span v-text="' ' + dtl.modeName + '資訊'"></span>
    </h2>
    <div class="detail-info bdrs-sm">
      <p v-text="`活動日期：${dtl.Date}`" v-if="dtl.Date"></p>
      <p v-if="!dtl.Date && dtl.StartTime">
        <span>活動期間：</span>
        <span v-text="dtl.StartTime + ' ~ '"></span>
        <span v-text="dtl.EndTime"></span>
      </p>
      <p v-text="`開放時段：${dtl.OpenTime}`" v-if="dtl.OpenTime"></p>
      <p v-text="`門票費用：${dtl.TicketInfo}`" v-if="dtl.TicketInfo"></p>
      <p v-if="dtl.Address">
        <span v-text="`${dtl.modeName}地點：`"></span>
        <span v-text="`${dtl.Location} `" v-if="dtl.Location"></span>
        <span v-text="dtl.Address"></span>
      </p>
      <p v-if="dtl.Phone">
        <span>連絡電話：</span>
        <a :href="`tel:${dtl.Phone}`" v-text="dtl.Phone"></a>
      </p>
      <p v-if="dtl.WebsiteUrl">
        <span>官方網站：</span>
        <a :href="dtl.WebsiteUrl" target="_blank">點我前往</a>
      </p>
      <p v-text="`舉辦單位：${dtl.Organizer}`" v-if="dtl.Organizer"></p>
      <p v-text="`備註說明：${dtl.Cycle}`" v-if="dtl.Cycle"></p>
      <p v-if="dtl.Class || dtl.Class1 || dtl.Class2">
        <span v-text="`${dtl.modeName}標籤：`"></span>
        <a
          href="#"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class"
          v-if="dtl.Class"
        ></a>
        <a
          href="#"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class1"
          v-if="dtl.Class1"
        ></a>
        <a
          href="#"
          class="detail-tag bdrs-sm"
          v-text="dtl.Class2"
          v-if="dtl.Class2"
        ></a>
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
    <h2 class="fz-md c-sce"><i class="ico-beach"></i> 查看鄰近的景點</h2>
    <h2 class="fz-md c-res"><i class="ico-restaurant"></i> 查看鄰近的餐飲</h2>
    <h2 class="fz-md c-htl"><i class="ico-hotel"></i> 查看鄰近的旅宿</h2>
    <h2 class="fz-md c-act"><i class="ico-flag-alt-2"></i> 查看鄰近的活動</h2>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getDetail, getMode } from "../modules.js";
import Banner from "../components/Banner.vue";

export default {
  name: "Detail",
  props: {
    mode: String,
    setMode: Function,
  },
  components: { Banner },
  setup(props) {
    const route = useRoute();
    const ID = computed(() => route.params.ID);
    const dtl = ref(null);
    const loadData = () => {
      if (!ID.value) return;
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

    loadData();
    watch(ID, () => loadData());

    return { dtl, getMode };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.detail {
  padding: min(2rem, 4vw);
  &-title {
    flex-wrap: wrap;
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
    padding: 1rem;
    background: linear-gradient(to right, #ffffffdd, #ffffffdd), $c_main;
    > p {
      margin-left: 5em;
      text-indent: -5em;
    }
  }
  &-pre {
    padding: 0 1rem;
    text-align: justify;
    white-space: pre-line;
  }
  &-tag {
    margin: 0 0.3rem;
    padding: 0.2rem 0.5rem 0.3rem;
    line-height: 3rem;
    color: $c_dark;
    background-color: $c_main;
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      color: $c_light;
    }
  }
}
</style>

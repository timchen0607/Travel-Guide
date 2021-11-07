<template>
  <div class="detail" v-if="detail">
    <div class="detail-title df-between">
      <div class="df-between">
        <button class="detail-btn">
          <i class="ico-rounded-left"></i>
        </button>
        <h1 class="fz-xxl" v-text="detail.Name"></h1>
      </div>
      <div>
        <button class="detail-btn"><i class="ico-print"></i></button>
        <button class="detail-btn"><i class="ico-share"></i></button>
      </div>
    </div>
    <Banner :pic="detail.Picture" :name="detail.Name" />

    <h2 class="fz-md c-main"><i class="ico-info-square"></i> 景點資訊</h2>
    <div class="detail-info bdrs-sm">
      <p v-text="detail.Address"></p>
      <p v-text="detail.Phone"></p>
      <p v-text="detail.OpenTime"></p>
      <!-- <p v-text="detail.WebsiteUrl"></p> -->
      <p v-text="detail.Class"></p>
      <!-- <p v-text="detail.Position"></p> -->
      <hr />
      <p v-text="detail.TravelInfo"></p>
      <p v-text="detail.OpenTime"></p>
      <p v-text="detail.ParkingPosition"></p>
      <p v-text="detail.TicketInfo"></p>
      <p v-text="detail.Remarks"></p>
      <hr />
      <p v-text="detail.ParkingInfo"></p>
      <hr />
      <p v-text="detail.Location"></p>
      <p v-text="detail.Organizer"></p>
      <p v-text="detail.StartTime"></p>
      <p v-text="detail.EndTime"></p>
      <p v-text="detail.Cycle"></p>
      <p v-text="detail.Class1"></p>
      <p v-text="detail.Class2"></p>
    </div>
    <h2 class="fz-md c-main"><i class="ico-google-talk"></i> 景點介紹</h2>
    <pre
      class="detail-desc"
      v-text="breakLine(detail.DescriptionDetail || detail.Description)"
    ></pre>
    <h2 class="fz-md c-main"><i class="ico-bus"></i> 交通方式</h2>
    <div class="bdrs-sm">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115631.41940957474!2d121.49146123632156!3d25.085545136346695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ac6b61dbbd8b%3A0xbcd1baad5c06a482!2z5Y-w5YyX5biC!5e0!3m2!1szh-TW!2stw!4v1636258425859!5m2!1szh-TW!2stw"
        width="100%"
        height="300"
        loading="lazy"
      ></iframe>
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
import { getDetail } from "../modules.js";
import Banner from "../components/Banner.vue";

export default {
  name: "Detail",
  props: {
    mode: String,
  },
  components: { Banner },
  setup() {
    const route = useRoute();
    const ID = computed(() => route.params.ID);
    const detail = ref(null);
    const breakLine = (str) => str.split("。").join("。\n\n");

    getDetail(ID.value).then((res) => {
      detail.value = res[0];
      document.title = detail.value.Name + " - Travel Guide";
    });
    watch(ID, () => {
      if (!ID.value) return;
      getDetail(ID.value).then((res) => {
        detail.value = res[0];
        document.title = detail.value.Name + " - Travel Guide";
      });
    });

    return { ID, detail, breakLine };
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
  }
  &-desc {
    text-align: justify;
    white-space: pre-line;
  }
}
</style>

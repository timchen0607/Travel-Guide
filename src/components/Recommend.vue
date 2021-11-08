<template>
  <div :class="'card-' + recMode">
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
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { getTravelInfo, dataFilter } from "../modules.js";

export default {
  name: "Recommend",
  props: { recMode: String, amount: String },
  setup(props) {
    const result = ref(null);
    const loadData = () => {
      getTravelInfo(props.recMode, "Taiwan", Math.floor(Math.random() * 10) + 1)
        .then((res) => dataFilter(res, props.amount))
        .then((data) => {
          data.forEach((item) => {
            if (item.StartTime) item.StartTime = item.StartTime.split("T")[0];
            if (item.EndTime) item.EndTime = item.EndTime.split("T")[0];
            if (item.StartTime === item.EndTime) item.Date = item.EndTime;
          });
          result.value = data;
        });
    };
    onMounted(() => loadData());

    return { result };
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div :class="'card-' + recMode" v-if="loading === 1">
    <router-link
      :to="`/D/${item[recMode + 'ID']}/`"
      class="card bdrs-sm"
      v-for="item in result"
      :key="item[recMode + 'ID']"
    >
      <div class="card-box">
        <img
          class="card-img"
          :src="item.Picture.PictureUrl1"
          :alt="item.Picture.PictureDescription1 || item[recMode + 'Name']"
          onerror="this.style.display='none'"
        />
      </div>
      <div class="card-content">
        <h2 class="card-title" v-text="item[recMode + 'Name']"></h2>
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
  <div v-if="loading === 0">
    <Loading :loadMode="recMode" :amount="parseInt(amount)" />
  </div>
  <div v-if="loading === -1">
    <Error />
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import {
  getTravelInfo,
  getNearbyInfo,
  dataFilter,
  dataRegular,
} from "../modules.js";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";

export default {
  name: "Recommend",
  props: {
    recMode: String,
    lat: Number,
    lon: Number,
    page: Number,
    amount: String,
  },
  components: { Loading, Error },
  setup(props) {
    const loading = ref(0);
    const result = ref(null);
    const loadData = () => {
      const load = props.lat
        ? getNearbyInfo(props.recMode, props.lat, props.lon, props.page)
        : getTravelInfo(props.recMode, "Taiwan", props.page);
      load
        .then((res) => {
          if (res.length === 0) throw new Error();
          return dataFilter(res, props.amount);
        })
        .then((res) => dataRegular(res))
        .then((data) => {
          result.value = data;
          loading.value = 1;
        })
        .catch(() => (loading.value = -1));
    };

    onMounted(() => loadData());

    return { loading, result };
  },
};
</script>

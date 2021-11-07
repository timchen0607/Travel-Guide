<template>
  <div class="search">
    <h1 class="fz-xxl" v-text="params.keyword.split(',').join()"></h1>

    <div class="search-list df-around">
      <router-link
        :to="`/D/${item.ID}/`"
        class="search-card df-center bdrs-xl"
        v-for="item in result"
        :key="item.ID"
      >
        <div class="search-img">
          <img
            :src="item.Picture.PictureUrl1"
            :alt="item.Picture.PictureDescription1 || item.Name"
          />
        </div>
        <div class="search-content">
          {{ item.Name }}
          {{ item.Address }}
          {{ Class }}
          {{ Class1 }}
          {{ Class2 }}
          {{ Class3 }}
        </div>
      </router-link>
    </div>
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
  },
  setup(props) {
    const route = useRoute();
    const params = computed(() => route.params);
    const result = ref(null);
    const type = computed(() => (params.value.city ? "Search" : "Nearby"));
    const getSearch = () => {
      if (!params.value.page) return;
      if (type.value === "Search") {
        const { city, page, keyword } = params.value;
        getTravelInfo(props.mode, city, page, keyword).then(
          (res) => (result.value = res)
        );
      }
      if (type.value === "Nearby") {
        const { lat, lon, page } = params.value;
        getNearbyInfo(props.mode, lat, lon, page).then(
          (res) => (result.value = res)
        );
      }
    };

    onMounted(() => getSearch());
    watch(params, () => getSearch());

    return { params, result };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.search {
  padding: min(2rem, 4vw);
  &-list {
    align-items: stretch;
  }
  &-card {
    flex-direction: column;
    width: 30%;
    margin-bottom: 1rem;
    text-decoration: none;
    @include pad {
      width: 32%;
    }
    @include mobile {
      width: 100%;
    }
  }
  &-img {
    width: 100%;
    height: 200px;
    > img {
      width: 100%;
      height: 100%;
      object-position: center center;
      object-fit: cover;
    }
  }
  &-content {
    flex: 1;
    padding: min(1rem, 3vw);
    background-color: $c_light;
  }
}
</style>

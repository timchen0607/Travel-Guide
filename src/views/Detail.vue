<template>
  <div class="detail" v-if="detail">
    <div class="d-flex-between">
      <div class="d-flex-between">
        <button class="detail-btn">
          <i class="ico-rounded-left"></i>
        </button>
        <h2 class="title-2" v-text="detail.Name"></h2>
      </div>
      <div>
        <button class="detail-btn"><i class="ico-print"></i></button>
        <button class="detail-btn"><i class="ico-share"></i></button>
      </div>
    </div>
    <Banner :pic="detail.Picture" :name="detail.Name" />

    {{ detail }}
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getDetail } from "../modules.js";
import Banner from "../components/Banner.vue";

export default {
  name: "Detail",
  components: { Banner },
  setup() {
    const route = useRoute();
    const ID = computed(() => route.params.ID);
    const detail = ref(null);
    getDetail(ID.value).then((res) => (detail.value = res[0]));

    watch(ID, () => {
      if (!ID.value) return;
      getDetail(ID.value).then((res) => (detail.value = res[0]));
    });

    return { ID, detail };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.detail {
  padding: 1.5rem;
  &-btn {
    margin: 0 0.5rem;
    padding: 0.3rem 0.5rem;
    font-size: 1.5rem;
    color: $c_success;
    background-color: transparent;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;
    &:hover {
      color: $c_light;
      background-color: $c_success;
    }
  }
}
</style>

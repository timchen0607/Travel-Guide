<template>
  <div>Detail</div>
  <h2 v-text="ID"></h2>
  <div v-text="detail"></div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getDetail } from "../modules.js";

export default {
  name: "Detail",
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

<style lang="scss" scoped></style>

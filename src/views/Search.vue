<template>
  <div></div>
</template>

<script>
// import { computed, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
// import { getDetail } from "../modules.js";

export default {
  name: "Search",
  setup() {
    const route = useRoute();
    console.log(route.params);
    // const ID = computed(() => route.params.ID);
    // const detail = ref(null);
    // getDetail(ID.value).then((res) => (detail.value = res[0]));

    // watch(ID, () => {
    //   if (!ID.value) return;
    //   getDetail(ID.value).then((res) => (detail.value = res[0]));
    // });

    // return { ID, detail };
  },
};
</script>

<style lang="scss"></style>

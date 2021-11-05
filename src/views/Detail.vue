<template>
  <div>Detail</div>
</template>

<script>
import { useRoute } from "vue-router";
import { getDetail } from "../modules.js";

export default {
  name: "Detail",
  setup() {
    const ID = useRoute().params.ID;
    getDetail(ID).then((res) => console.log(res[0]));
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="banner shadow">
    <input
      type="radio"
      class="banner-radio"
      name="banner-radio"
      v-for="i in count"
      :key="i"
      :id="`banner-radio-${i}`"
    />
    <ul class="banner-box">
      <li class="banner-item shadow bdrs-xl" v-for="i in count" :key="i">
        <img
          class="banner-item-img"
          :src="pic['PictureUrl' + i]"
          :alt="pic['PictureDescription' + i] || name"
          :title="pic['PictureDescription' + i] || name"
          onerror="this.style.display='none'"
        />
      </li>
    </ul>
    <div class="banner-ctl">
      <label
        :for="'banner-radio-' + i"
        class="banner-ctl-item"
        v-for="i in count"
        :key="i"
        @click="
          move = true;
          idx = i - 1;
        "
      ></label>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

export default {
  name: "Banner",
  props: { pic: Object, name: String },
  setup(props) {
    const count = computed(() => {
      if (props.pic.PictureUrl3) return 3;
      if (props.pic.PictureUrl2) return 2;
      if (props.pic.PictureUrl1) return 1;
    });
    const idx = ref(0);
    const move = ref(false);
    let seconds = 0;
    let frame;
    const animation = () => {
      if (move.value) seconds = 0;
      if (seconds > 300) {
        idx.value++;
        idx.value %= count.value;
        const radio = document.querySelectorAll(".banner-radio");
        radio.forEach((item, index) => (item.checked = idx.value === index));
        seconds = 0;
      }
      seconds++;
      move.value = false;
      frame = requestAnimationFrame(animation);
    };

    onMounted(() => {
      document.querySelectorAll(".banner-radio")[0].checked = true;
      frame = requestAnimationFrame(animation);
    });
    onBeforeRouteUpdate(() => cancelAnimationFrame(frame));
    onBeforeRouteLeave(() => cancelAnimationFrame(frame));

    return { count, idx, move };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.banner {
  position: relative;
  width: 100%;
  height: min(300px, 40vw);
  margin: 1.5rem 0;
  overflow: hidden;
  &-radio {
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}):checked ~ .banner-ctl label:nth-of-type(#{$i}) {
        background-color: $c_main;
      }
      &:nth-of-type(#{$i}):checked ~ .banner-box {
        transform: translateX(($i - 1) * -100%);
      }
    }
  }
  &-box {
    position: absolute;
    top: 0;
    width: inherit;
    height: inherit;
    transition: 0.5s transform;
  }
  &-item {
    position: absolute;
    width: inherit;
    height: inherit;
    margin: 0;
    background: url(../assets/images/logo.png) no-repeat center center / 30%,
      $c_light;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        left: ($i - 1) * 100%;
      }
    }
    &-img {
      width: 100%;
      height: 100%;
      object-position: center center;
      object-fit: cover;
    }
  }
  &-ctl {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    &-item {
      display: inline-block;
      width: 30px;
      height: 5px;
      background-color: #fff;
      border-radius: 5px;
      margin: 0 3px;
      border: 3px solid #fff;
      cursor: pointer;
    }
  }
}
</style>

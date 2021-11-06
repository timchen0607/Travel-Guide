<template>
  <div class="banner">
    <input
      type="radio"
      id="banner-radio-1"
      class="banner-radio"
      name="banner-radio"
      checked
    />
    <input
      type="radio"
      id="banner-radio-2"
      class="banner-radio"
      name="banner-radio"
    />
    <input
      type="radio"
      id="banner-radio-3"
      class="banner-radio"
      name="banner-radio"
    />
    <ul class="banner-content">
      <li class="banner-content-item banner" v-for="i in count" :key="i">
        <img
          :src="pic['PictureUrl' + i]"
          :alt="pic['PictureDescription' + i] || name"
          :title="pic['PictureDescription' + i] || name"
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
import { watch } from "@vue/runtime-core";

export default {
  name: "Banner",
  props: {
    pic: Object,
    name: String,
  },
  setup(props) {
    const count = computed(() => {
      if (props.pic.PictureUrl3) return 3;
      if (props.pic.PictureUrl2) return 2;
      if (props.pic.PictureUrl1) return 1;
    });

    const idx = ref(0);
    const move = ref(false);
    setInterval(() => {
      if (move.value) {
        move.value = false;
        return;
      }
      idx.value = idx.value >= count.value - 1 ? 0 : idx.value + 1;
      const res = document.querySelectorAll(".banner-radio");
      res.forEach((item, index) => {
        item.checked = idx.value === index ? true : false;
      });
    }, 5000);

    watch(
      () => props.pic,
      () => {
        const res = document.querySelectorAll(".banner-radio");
        res.forEach((item, index) => {
          item.checked = index === 0 ? true : false;
        });
        document.querySelectorAll(".banner-radio")[0].checked = true;
        move.value = false;
      }
    );

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
      &:nth-of-type(#{$i}):checked ~ .banner-content {
        transform: translateX(($i - 1) * -100%);
      }
    }
  }
  &-content {
    position: absolute;
    top: 0;
    width: inherit;
    height: inherit;
    transition: 0.5s transform;
  }
  &-content-item {
    position: absolute;
    width: inherit;
    height: inherit;
    margin: 0;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        left: ($i - 1) * 100%;
      }
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

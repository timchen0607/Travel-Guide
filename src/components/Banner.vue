<template>
  <div class="slides">
    <input
      type="radio"
      id="slides-radio-1"
      class="slides-radio"
      name="slides-radio"
      checked
    />
    <input
      type="radio"
      id="slides-radio-2"
      class="slides-radio"
      name="slides-radio"
    />
    <input
      type="radio"
      id="slides-radio-3"
      class="slides-radio"
      name="slides-radio"
    />
    <ul class="slides-content">
      <li class="slides-content-item banner" v-for="i in count" :key="i">
        <img
          :src="pic['PictureUrl' + i]"
          :alt="pic['PictureDescription' + i] || name"
          :title="pic['PictureDescription' + i] || name"
        />
      </li>
    </ul>
    <div class="slides-control">
      <label
        :for="'slides-radio-' + i"
        class="slides-control-item"
        v-for="i in count"
        :key="i"
      ></label>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";

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

    return { count };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

$colorList: (#fd5, #f50, #458);
.slides {
  position: relative;
  width: 100%;
  height: min(300px, 40vw);
  margin: 1.5rem 0;
  overflow: hidden;
  &-radio {
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}):checked ~ .slides-control label:nth-of-type(#{$i}) {
        background-color: $c_main;
      }
      &:nth-of-type(#{$i}):checked ~ .slides-content {
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 100px;
    font-weight: bold;

    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        left: ($i - 1) * 100%;
      }
    }
  }
  &-control {
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

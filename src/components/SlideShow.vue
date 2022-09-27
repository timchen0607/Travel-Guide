<template>
  <div class="slideShow boxShadow">
    <input
      type="radio"
      class="slideShow__radio"
      name="slideShow__radio"
      v-for="i in picCount"
      :key="i"
      :id="`slideShow__radio--${i}`"
    />
    <ul class="slideShow__box">
      <li
        class="slideShow__item bdrs-xl boxShadow"
        v-for="i in picCount"
        :key="i"
      >
        <img
          class="slideShow__img"
          :src="pic['PictureUrl' + i]"
          :alt="pic['PictureDescription' + i] || name"
          :title="pic['PictureDescription' + i] || name"
          onerror="this.style.display='none'"
        />
      </li>
    </ul>
    <div class="slideShow__progressBar"></div>
    <div class="slideShow__controlGroup">
      <label
        :for="'slideShow__radio--' + i"
        class="slideShow__controlBtn"
        v-for="i in picCount"
        :key="i"
        @click="(isUserTrigger = true), (picShowIdx = i - 1)"
      ></label>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

export default {
  name: "SlideShow",
  props: { pic: Object, name: String },
  setup(props) {
    // 計算圖片數量
    const picCount = computed(() => {
      if (props.pic.PictureUrl3) return 3;
      if (props.pic.PictureUrl2) return 2;
      if (props.pic.PictureUrl1) return 1;
    });
    // 處理輪播動畫效果
    const [picShowIdx, isUserTrigger] = [ref(0), ref(false)];
    const switchTime = 600;
    let [slideTime, slideFrame] = [0, null];
    const animation = () => {
      if (isUserTrigger.value) slideTime = 0;
      if (slideTime > switchTime) {
        picShowIdx.value++, (picShowIdx.value %= picCount.value);
        const radio = document.querySelectorAll(".slideShow__radio");
        radio.forEach((item, idx) => (item.checked = picShowIdx.value === idx));
        slideTime = 0;
      }
      const progress = (-1 + slideTime / switchTime) * 100 + "%";
      document.documentElement.style.setProperty("--progress", progress);
      isUserTrigger.value = false;
      slideTime++, (slideFrame = requestAnimationFrame(animation));
    };
    // 當資料變動時清除舊的動畫效果
    onMounted(() => {
      document.querySelectorAll(".slideShow__radio")[0].checked = true;
      slideFrame = requestAnimationFrame(animation);
    });
    onBeforeRouteUpdate(() => cancelAnimationFrame(slideFrame));
    onBeforeRouteLeave(() => cancelAnimationFrame(slideFrame));

    return { picCount, picShowIdx, isUserTrigger };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.slideShow {
  position: relative;
  width: 100%;
  height: min(300px, 40vw);
  margin: 1.5rem 0;
  overflow: hidden;
  &__radio {
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}):checked
        ~ .slideShow__controlGroup
        label:nth-of-type(#{$i}) {
        background-color: $c_main;
      }
      &:nth-of-type(#{$i}):checked ~ .slideShow__box {
        transform: translateX(($i - 1) * -100%);
      }
    }
  }
  &__box {
    position: absolute;
    top: 0;
    width: inherit;
    height: inherit;
    transition: 0.5s transform;
  }
  &__item {
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
  }
  &__img {
    width: 100%;
    height: 100%;
    object-position: center center;
    object-fit: cover;
    user-drag: none;
    -webkit-user-drag: none;
  }
  &__progressBar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.25rem;
    background: $c_main;
    transform: translateX(var(--progress));
  }
  &__controlGroup {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
  &__controlBtn {
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
</style>

<template>
  <div class="container">
    <header :class="['head', 'shadow', { show: headerShow }]">
      <Header :city="city" @closeHeader="closeHeader" @setCity="setCity" />
    </header>
    <div class="box">
      <div
        class="goTop df-center fz-xl bdrs-xl shadow"
        onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
      >
        <i class="ico-rounded-left"></i>
      </div>
      <nav class="nav shadow">
        <button class="nav-btn show" @click="headerShow = true">
          <i class="ico-settings"></i>
        </button>
        <router-link to="/" class="nav-logo"></router-link>
        <button class="nav-btn"><i class="ico-settings"></i></button>
      </nav>
      <router-view
        :mode="mode"
        :city="city"
        :key="$route.fullPath"
        @setMode="setMode"
      />
      <footer class="foot df-around">
        <p><i class="icoTW-main-island"></i>TAIWAN TRAVEL</p>
        <div>
          <p>
            UI Design：
            <a
              href="https://www.figma.com/file/fnHynjl6HHHCcqay2C4KVn"
              target="_blank"
            >
              jhen
            </a>
          </p>
          <p>
            Front-end：
            <a href="https://github.com/timchen0607" target="_blank">
              Tim Chen
            </a>
          </p>
        </div>
        <p>Source：交通部PTX服務平臺</p>
        <img
          src="./assets/images/ptx_logo.png"
          alt="交通部PTX服務平臺"
          class="foot-ptx"
        />
      </footer>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: { Header },
  setup() {
    // 控制側邊導覽列顯示狀態
    const headerShow = ref(false);
    const closeHeader = () => (headerShow.value = false);
    //
    const mode = ref("ScenicSpot");
    const setMode = (m) => (mode.value = m);
    const city = ref("Taiwan");
    const setCity = (c) => (city.value = c);
    watch(
      () => mode.value,
      () => {
        const root = (val) => {
          document.documentElement.style.setProperty("--c-main", val);
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute("content", val);
        };
        if (mode.value === "ScenicSpot") root("#3fb195");
        if (mode.value === "Restaurant") root("#ff9999");
        if (mode.value === "Hotel") root("#A79BFD");
        if (mode.value === "Activity") root("#feb155");
      }
    );

    return { headerShow, closeHeader, mode, setMode, city, setCity };
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/_variables.scss";

.container {
  align-items: flex-start;
}
.head {
  position: sticky;
  top: 0;
  width: 354px;
  height: 100vh;
  padding: 1.5rem;
  background-color: $c_light;
  box-sizing: border-box;
  overflow: auto;
  overscroll-behavior: contain;
  @include pad {
    position: fixed;
    z-index: 10;
    transform: translateX(-150%);
    transition: transform 0.5s;
  }
  @include mobile {
    width: 100vw;
  }
  &.show {
    @include pad {
      transform: translateX(0%);
    }
  }
}
.box {
  flex: 1;
  box-sizing: border-box;
  .goTop {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: none;
    width: 40px;
    height: 40px;
    color: $c_light;
    background-color: $c_main;
    cursor: pointer;
    transform: rotate(90deg);
    z-index: 1;
  }
  .nav {
    position: sticky;
    top: 0;
    display: none;
    justify-content: space-between;
    align-items: center;
    background-color: $c_light;
    z-index: 5;
    @include pad {
      display: flex;
    }
    &-btn {
      margin: 0 1rem;
      font-size: 1.8rem;
      color: $c_main;
      background-color: $c_secondary-light;
      border: none;
      border-radius: 0.5rem;
      outline: none;
      opacity: 0;
      &.show {
        opacity: 1;
      }
    }
    &-logo {
      display: block;
      width: 100px;
      height: 70px;
      background: url(./assets/images/logo.png) no-repeat center center /
        contain;
    }
  }
  .foot {
    padding: 0.5rem;
    font-size: 1.1rem;
    color: $c_light;
    background-color: $c_main;
    @include mobile {
      & > * {
        width: 100%;
        margin-bottom: 0.5rem;
        text-align: center;
      }
    }
    .icoTW-main-island {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    &-ptx {
      width: 80px;
    }
  }
}
</style>

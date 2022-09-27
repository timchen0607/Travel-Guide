<template>
  <div class="webLayout">
    <header
      class="webLayout__sideMenu boxShadow doNotPrint"
      :class="{ 'webLayout__sideMenu--show': isSideMenuShow }"
    >
      <Header
        @setSideMenuClose="isSideMenuShow = false"
        :city="city"
        @setCity="setCity"
      />
    </header>
    <div class="webLayout__mainView">
      <div
        class="goToTop df-center fz-xl bdrs-xl boxShadow doNotPrint"
        @click="goToTop"
      >
        <i class="ico-rounded-left"></i>
      </div>
      <nav class="topNavBar boxShadow">
        <button class="topNavBar__btn" @click="isSideMenuShow = true">
          <i class="ico-settings"></i>
        </button>
        <router-link to="/" class="topNavBar__logo"></router-link>
        <div class="topNavBar__btn"></div>
      </nav>
      <!-- 將網址設為索引值，以觸發畫面更新 -->
      <router-view
        :city="city"
        :mode="mode"
        @setMode="setMode"
        :key="$route.fullPath"
      />
      <footer class="footer df-around">
        <p><i class="icoTW-main-island footer__twIcon"></i>TAIWAN TRAVEL</p>
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
            Front-End：
            <a href="https://timchen0607.github.io/" target="_blank">
              Tim Chen
            </a>
          </p>
        </div>
        <p>Source：交通部PTX服務平臺</p>
        <img
          src="./assets/images/ptx_logo.png"
          alt="交通部PTX服務平臺"
          class="footer__ptx"
        />
      </footer>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import Header from "./components/Header.vue";
import { modeLib } from "./lib";

export default {
  name: "App",
  components: { Header },
  setup() {
    // 控制側邊導覽列顯示狀態
    const isSideMenuShow = ref(false);
    // 存取目前城市
    const city = ref("Taiwan");
    const setCity = (c) => (city.value = c);
    // 滾動至頂部
    const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    // 控制當前網站呈現的樣式與搜尋模式
    const mode = ref("ScenicSpot");
    const setMode = (m) => (mode.value = m);
    const setModeColor = (color) => {
      document.documentElement.style.setProperty("--c-main", color);
      const themeColor = document.querySelector('meta[name="theme-color"]');
      themeColor.setAttribute("content", color);
    };
    watch(
      () => mode.value,
      () => setModeColor(modeLib[mode.value].color)
    );

    return {
      isSideMenuShow,
      city,
      setCity,
      goToTop,
      mode,
      setMode,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/_variables.scss";

.webLayout {
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: min(1440px, 100vw);
  margin: auto;
  box-sizing: border-box;
  @include pad {
    flex-wrap: wrap;
  }
  &__sideMenu {
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
    &--show {
      @include pad {
        transform: translateX(0%);
      }
    }
  }
  &__mainView {
    flex: 1;
    box-sizing: border-box;
  }
}
.goToTop {
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
.topNavBar {
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
  &__btn {
    margin: 0 1rem;
    font-size: 1.8rem;
    color: $c_main;
    background-color: $c_secondary-light;
    border: none;
    border-radius: 0.5rem;
    outline: none;
  }
  &__logo {
    display: block;
    width: 100px;
    height: 70px;
    background: url(./assets/images/logo.png) no-repeat center center / contain;
  }
}
.footer {
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
  &__twIcon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  &__ptx {
    width: 80px;
  }
}
</style>

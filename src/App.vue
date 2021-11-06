<template>
  <div class="container">
    <header :class="['head', { show: headerShow }]">
      <Header :closeHeader="closeHeader" />
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/Taiwan/1/">Search1</router-link> |
        <router-link to="/Taiwan/1/游泳/">Search2</router-link> |
        <router-link to="/23.7083775/120.398561/1/"> Search3 </router-link> |
        <router-link to="/D/C3_315081000H_020111">Detail1</router-link> |
        <router-link to="/D/C1_315080500H_000068">Detail2</router-link> |
        <router-link to="/D/C4_315080000H_000539">Detail3</router-link> |
        <router-link to="/D/C2_315080000H_080485">Detail4</router-link>
      </div>
      <div>
        <i class="ico-clock-time"></i>
        <i class="ico-ui-touch-phone"></i>
        <i class="ico-location-pin"></i>
        <i class="ico-heart"></i>
      </div>
      <div>
        <input type="radio" value="ScenicSpot" v-model="mode" />ScenicSpot
        <input type="radio" value="Restaurant" v-model="mode" />Restaurant
        <input type="radio" value="Hotel" v-model="mode" />Hotel
        <input type="radio" value="Activity" v-model="mode" />Activity
      </div>
    </header>
    <div class="box">
      <nav class="nav">
        <button class="nav-btn show" @click="headerShow = true">
          <i class="ico-settings"></i>
        </button>
        <p class="nav-logo">TRAVEL</p>
        <button class="nav-btn"><i class="ico-settings"></i></button>
      </nav>
      <router-view :mode="mode" />
      <footer class="foot d-flex-around">
        <h5 class="foot-logo">
          <i class="icoTW-main-island"></i>TAIWAN TRAVEL
        </h5>
        <div>
          <p>
            UI Design：
            <a
              href="https://www.figma.com/file/fnHynjl6HHHCcqay2C4KVn"
              target="_blank"
              class="foot-creater"
            >
              jhen
            </a>
          </p>
          <p>
            Front-end：
            <a
              href="https://github.com/timchen0607"
              target="_blank"
              class="foot-creater"
            >
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
import Header from "./components/Header.vue";
import { watch } from "@vue/runtime-core";

export default {
  name: "App",
  components: { Header },
  setup() {
    const headerShow = ref(false);
    const closeHeader = () => (headerShow.value = false);
    const mode = ref("ScenicSpot");

    watch(
      () => mode.value,
      () => {
        const root = (val) =>
          document.documentElement.style.setProperty("--c-main", val);
        if (mode.value === "ScenicSpot") root("#3fb195");
        if (mode.value === "Restaurant") root("#ff9999");
        if (mode.value === "Hotel") root("#A79BFD");
        if (mode.value === "Activity") root("#feb155");
      }
    );

    return { headerShow, mode, closeHeader };
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
  box-shadow: 0px 0px 1.5rem #00000011;
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
  .nav {
    position: sticky;
    top: 0;
    display: none;
    justify-content: space-between;
    align-items: center;
    background-color: $c_light;
    box-shadow: 0px 1rem 1.5rem #00000011;
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
      color: transparent;
      background: url(./assets/images/logo.png) no-repeat center center /
        contain;
      user-select: none;
    }
  }
  .foot {
    flex-wrap: wrap;
    padding: 0.5rem;
    font-size: 1.1rem;
    color: $c_light;
    background-color: $c_main;
    @include mobile {
      & > * {
        margin-bottom: 0.5rem;
      }
      &-logo {
        text-align: center;
        width: 100%;
      }
    }
    .icoTW-main-island {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    &-creater {
      color: $c_light;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    &-ptx {
      width: 80px;
    }
  }
}
</style>

<template>
  <div
    class="container"
    v-show="containTagggle"
    @touchmove.prevent
    @mousewheel.prevent
  >
    <div class="messageBox" v-show="flag">
      <a :href="item.urls" v-for="(item, index) in adsList" :key="index">
        <img :src="`${item.image}`" :alt="item.name" />
      </a>
      <em></em>

      <span @click="handleClose()"><i class="el-icon-close"></i></span>
    </div>
    <div class="greyBackground"></div>
  </div>
</template>

<script>
import { getAds } from "../utils/api";
export default {
  data() {
    return {
      // containTagggle: false,
      containTagggle: true,
      adsList: [],
      flag: false,
    };
  },
  mounted() {
    this.renderAds();
  },
  methods: {
    handleClose() {
      this.containTagggle = false;
    },
    async renderAds() {
      let d = await getAds();
      if (d.status == 200) {
        if (d.data.data.list.length == 0) {
          this.flag = false;
          this.containTagggle = false

        } else {
          this.adsList = d.data.data.list;
          this.flag = true;
        }
      }
    },
  },
  created() {
    if (sessionStorage.getItem("messageBox")) {
      this.containTagggle = false;
    } else {
      this.containTagggle = true;
      sessionStorage.setItem("messageBox", true);
      this.timer = setTimeout(() => {
        this.containTagggle = false;
      }, 10000);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang='scss' scoped>
$bg-color: #0985c6;
$color: #ffffff;
$icon-color: #fff;
.container {
}
.messageBox {
  position: fixed;
  left: 0;
  right: 0;

  margin: 0 auto;
  top: 3.38rem;
  bottom: 0;

  z-index: 999;
  width: 6.7rem;
  height: 4.02rem;
  // background-color: $bg-color;
  border: 0.02rem solid $color;

  a {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
  em {
    position: absolute;
    left: 0;
    right: 0;
    top: 4.04rem;
    z-index: -1;
    margin: 0 auto;
    width: 0.04rem;
    height: 1.63rem;
    background-color: #fff;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 5.65rem;
    width: 1rem;
    height: 1rem;
    border: solid 0.04rem #ffffff;
    border-radius: 50%;
    font-size: 0.6rem;
    font-weight: 100;
    color: $icon-color;
    i {
    }
  }
}
.greyBackground {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: black;
  opacity: 0.4;
}
</style>
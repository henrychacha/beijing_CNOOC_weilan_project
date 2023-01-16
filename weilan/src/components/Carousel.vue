<template>
  <div class="hello">
    <div class="block">
      <el-carousel trigger="click" height="3.6rem">
        <el-carousel-item
          :style="{
            background: `url(${item.image}) no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
          v-for="item in bannerList"
          :key="item.id"
        >
          <a :href="item.url"></a>
          <!-- <img :src="item.url" alt="" /> -->
          <!-- <h3 class="small">{{ item.url }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getBanner } from "../utils/api.js";
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      bannerList: [],
    };
  },
  components: {},
  mounted() {
    this.renderBanner();
  },
  methods: {
    async renderBanner() {
      let d = await getBanner();
      if (d.status == 200) {
        // console.log(d)
        this.bannerList = d.data.data.list;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.block {
  a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .el-carousel__item {
  }
  .el-carousel__item img {
    height: 150px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  button.el-carousel__button {
    // border: 4px solid red;
    height: 0.1rem !important;
    width: 0.1rem !important;
    border-radius: 50% !important;
    margin-right: 0.21rem !important;
  }
  .el-carousel__indicators.el-carousel__indicators--horizontal {
    margin-bottom: 0.19rem;
  }
}
</style>

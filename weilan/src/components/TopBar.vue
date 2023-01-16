<template>
  <div class="TopBar">
    <i  @click="naviToCompanyDetail()"   class="el-icon-tickets" v-if="!arrowTaggle"> </i>
    <img
    v-if="arrowTaggle"
      @click="naviToIndex()"
      class="arrow"
      src="../assets/image/images/weilan-left-arrow.gif"
      alt=""
    />
    <!-- <i class="el-icon-arrow-left" v-if="arrowTaggle" style="color: #999999"></i> -->
    <h1>{{ name }}</h1>
    <em @click="naviToSearch()" class="el-icon-search" v-if="!arrowTaggle"></em>
  </div>
</template>

<script>
export default {
  props: ["name", "arrowTaggle"],
  methods: {
    naviToSearch() {
      if (this.$route.path == "/search") {
        return;
      } else {
        this.$router.push({ path: "/search" });
      }
    },
    naviToIndex(){
      this.$router.push({path:'/'})
    },
    naviToCompanyDetail(){
      this.$router.push({path:'/cdetail'})
    }
  },
};
</script>

<style lang="scss" scoped>
.TopBar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.88rem;
  background-color: #ffffff;
  .arrow {
    width: 0.2rem;
    height: 0.36rem;
    position: absolute;
    top: 0.26rem;
    left: 0.3rem;
    font-size: 0.36rem;
    color: #999999;
    font-weight: 500;
  }
  i {
    position: absolute;
    left: 0.4rem;
    font-size: 0.36rem;
    color: #0686c7;
    font-weight: 500;
  }
  h1 {
    width: 2.27rem;
    height: 0.31rem;
    font-size: 0.32rem;
    font-weight: 500;
    font-stretch: normal;
    line-height: 0.28rem;
    letter-spacing: 0rem;
    color: #333333;

    // white-space: nowrap;
  }
  em {
    right: 0.39rem;
    position: absolute;
    font-size: 0.36rem;
    color: #0686c7;
    font-weight: 500;
  }
}
</style>
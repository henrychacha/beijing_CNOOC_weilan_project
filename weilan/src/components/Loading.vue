<template>
  <div
    class="bottom"
    :style="{
      backgroundColor: `${taggleLoading == 0 ? '#eeeeee' : '#fff'}`,
      height: `${taggleLoading == 0 ? '3rem' : '1rem'}`,
    }"
  >
    <div
      class="loading"
      :style="{
        borderTop: `${
          taggleLoading == 0 ? '0.04rem solid #eeeeee' : '0.04rem solid #fff'
        }`,
      }"
    ></div>
    <div class="right">加载中...</div>
  </div>
</template>

<script>
export default {
  props: ["taggleLoading"],
};
</script>

<style  lang="scss" scoped>
.bottom {
  box-sizing: border-box;
  display: flex;
  padding-bottom: 0.29rem;
  align-items: center;
  justify-content: center;
  // background-color: #fff;
  // height: 1rem;
  width: 100%;
}
.right {
  margin-left: 0.2rem;
  text-align: left;
  white-space: nowrap;
  height: 0.19rem;
  font-size: 0.2rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #0686c7;
}
.loading {
  border: 0.04rem solid #2595ce;
  border-radius: 50%;
  border-top: 0.04rem solid #ffffff;
  width: 0.3rem;
  height: 0.3rem;
  -webkit-animation: spin 0.8s linear infinite;
  animation: spin 0.8s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>